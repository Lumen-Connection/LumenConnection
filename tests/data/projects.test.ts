import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { projects, heroProjects, sectionProjects } from '../../src/data/projects.ts'
import { successCases } from '../../src/data/success-cases.ts'
import { categories, navItems } from '../../src/data/navigation.ts'
import { isSafeUrl } from '../../src/lib/url.ts'

describe('projects data integrity', () => {
  test('each project has required fields', () => {
    for (const p of projects) {
      assert.ok(p.id, `project ${p.title} missing id`)
      assert.ok(p.title, 'project missing title')
      assert.ok(p.category, 'project missing category')
      assert.ok(p.description, 'project missing description')
      assert.ok(p.color.startsWith('#'), `project ${p.title} color invalid`)
      assert.ok(Array.isArray(p.items), 'project items must be array')
    }
  })

  test('project ids are unique', () => {
    const ids = projects.map((p) => p.id)
    const unique = new Set(ids)
    assert.equal(ids.length, unique.size, 'duplicate project ids found')
  })

  test('each project item has a safe URL when url is set', () => {
    for (const p of projects) {
      for (const item of p.items) {
        if (item.url !== undefined) {
          assert.ok(isSafeUrl(item.url), `unsafe url in ${p.title} → ${item.title}: ${item.url}`)
        }
      }
    }
  })

  test('item ids are unique within each project', () => {
    for (const p of projects) {
      const ids = p.items.map((i) => i.id)
      assert.equal(ids.length, new Set(ids).size, `duplicate item ids in ${p.title}`)
    }
  })

  test('local media referenced by items exists in public/', () => {
    for (const p of projects) {
      for (const item of p.items) {
        for (const src of [item.image, item.poster, item.videoUrl]) {
          if (!src || src === '/' || !src.startsWith('/')) continue
          assert.ok(existsSync(`public${src}`), `missing file for ${p.title} → ${item.title}: ${src}`)
        }
      }
    }
  })

  test('heroProjects excludes projects with showInHero === false', () => {
    for (const p of heroProjects) {
      assert.notEqual(p.showInHero, false, `${p.title} should not be in heroProjects`)
    }
  })

  test('sectionProjects excludes heroOnly projects', () => {
    for (const p of sectionProjects) {
      assert.notEqual(p.heroOnly, true, `${p.title} should not be in sectionProjects`)
    }
  })

  test('all categories have at least one matching project (except "Todos")', () => {
    const projectCategories = new Set(projects.map((p) => p.category))
    for (const c of categories) {
      if (c === 'Todos') continue
      assert.ok(
        projectCategories.has(c),
        `category "${c}" has no matching project`
      )
    }
  })
})

describe('success cases data integrity', () => {
  test('each case has nome and descrição', () => {
    for (const c of successCases) {
      assert.ok(c.nome, 'case missing nome')
      assert.ok(c.descrição, 'case missing descrição')
    }
  })

  test('case URLs are safe when present', () => {
    for (const c of successCases) {
      if (c.url !== undefined) {
        assert.ok(isSafeUrl(c.url), `unsafe url in case ${c.nome}: ${c.url}`)
      }
    }
  })
})

describe('navigation data integrity', () => {
  test('every navItem has a safe href', () => {
    for (const item of navItems) {
      assert.ok(isSafeUrl(item.href), `unsafe nav href: ${item.href}`)
    }
  })

  test('"Todos" is the first category', () => {
    assert.equal(categories[0], 'Todos')
  })
})
