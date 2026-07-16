import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { upcomingProjects } from '../../src/data/upcoming-projects.ts'
import { futureProjects } from '../../src/data/future-projects.ts'
import { formatCountdown, getUpcomingProjects } from '../../src/lib/upcoming.ts'

describe('upcoming projects data integrity', () => {
  test('each project has required fields', () => {
    for (const p of upcomingProjects) {
      assert.ok(p.id, `upcoming project ${p.title} missing id`)
      assert.ok(p.title, 'upcoming project missing title')
      assert.ok(p.category, 'upcoming project missing category')
      assert.ok(p.image.startsWith('/'), `${p.title} image must be an absolute path`)
    }
  })

  test('project ids are unique', () => {
    const ids = upcomingProjects.map((p) => p.id)
    assert.equal(ids.length, new Set(ids).size, 'duplicate upcoming project ids found')
  })

  test('every cover exists in public/', () => {
    for (const p of upcomingProjects) {
      const file = new URL(`../../public${p.image}`, import.meta.url)
      assert.ok(existsSync(file), `missing cover for ${p.title}: ${p.image}`)
    }
  })

  test('launchAt is a parseable ISO date carrying an explicit offset', () => {
    for (const p of upcomingProjects) {
      if (p.launchAt === undefined) continue
      assert.ok(
        !Number.isNaN(Date.parse(p.launchAt)),
        `${p.title} has an unparseable launchAt: ${p.launchAt}`,
      )
      assert.match(
        p.launchAt,
        /(Z|[+-]\d{2}:\d{2})$/,
        `${p.title} launchAt must pin a timezone offset: ${p.launchAt}`,
      )
    }
  })
})

describe('future projects data integrity', () => {
  test('each idea has a title and a description', () => {
    for (const p of futureProjects) {
      assert.ok(p.id, `future project ${p.title} missing id`)
      assert.ok(p.title.trim(), 'future project missing title')
      assert.ok(
        p.description.trim(),
        `future project ${p.title} needs a description: it is the only content the row shows`,
      )
    }
  })

  test('idea ids are unique', () => {
    const ids = futureProjects.map((p) => p.id)
    assert.equal(ids.length, new Set(ids).size, 'duplicate future project ids found')
  })

  test('ideas stay out of the launch widget list', () => {
    const upcomingTitles = new Set(upcomingProjects.map((p) => p.title))
    for (const p of futureProjects) {
      assert.ok(
        !upcomingTitles.has(p.title),
        `${p.title} is both an idea and an announced launch: keep it in one list only`,
      )
    }
  })
})

describe('getUpcomingProjects', () => {
  const past = Date.parse('2000-01-01T00:00:00-03:00')
  const future = Date.parse('2100-01-01T00:00:00-03:00')

  test('drops launches that already happened', () => {
    const dated = upcomingProjects.filter((p) => p.launchAt)
    assert.ok(dated.length > 0, 'fixture needs at least one dated project')
    const ids = getUpcomingProjects(upcomingProjects, future).map((p) => p.id)
    for (const p of dated) {
      assert.ok(!ids.includes(p.id), `${p.title} should be gone once its date passed`)
    }
  })

  test('keeps undated projects regardless of "now"', () => {
    const undated = upcomingProjects.filter((p) => !p.launchAt)
    const ids = getUpcomingProjects(upcomingProjects, future).map((p) => p.id)
    for (const p of undated) {
      assert.ok(ids.includes(p.id), `${p.title} has no date and must stay listed`)
    }
  })

  test('sorts by date, with undated projects last', () => {
    const items = getUpcomingProjects(upcomingProjects, past)
    assert.equal(items.length, upcomingProjects.length)

    const firstUndated = items.findIndex((p) => !p.launchAt)
    if (firstUndated !== -1) {
      assert.ok(
        items.slice(firstUndated).every((p) => !p.launchAt),
        'a dated project must never follow an undated one',
      )
    }

    const dates = items.filter((p) => p.launchAt).map((p) => Date.parse(p.launchAt!))
    for (let i = 1; i < dates.length; i++) {
      assert.ok(dates[i - 1] <= dates[i], 'dated projects must be in chronological order')
    }
  })
})

describe('formatCountdown', () => {
  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR

  test('omits the day segment below 24h', () => {
    assert.equal(formatCountdown(2 * HOUR + 3 * MINUTE + 4 * SECOND), 'T-02:03:04')
  })

  test('includes the day segment at or above 24h', () => {
    assert.equal(formatCountdown(2 * DAY + 5 * HOUR), 'T-2d 05:00:00')
  })

  test('clamps to zero once the launch time has passed', () => {
    assert.equal(formatCountdown(-5 * HOUR), 'T-00:00:00')
  })
})
