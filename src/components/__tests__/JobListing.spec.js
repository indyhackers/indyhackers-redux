import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import JobListing from '../jobs/JobListing.vue'

const mockJob = {
  id: 'job1',
  title: 'Senior Developer',
  company: 'Acme Corp',
  salary_min: 100,
  salary_max: 150,
  description: '<p>Great <strong>opportunity</strong></p>',
  how_to_apply: '<p>Email <a href="mailto:hr@acme.com">hr@acme.com</a></p>',
  created: '2025-01-10T12:00:00.000Z',
  approved_at: '2025-01-15T12:00:00.000Z',
  approved: true,
}

function createMockPocketBase(job = mockJob) {
  return {
    collection: vi.fn().mockReturnValue({
      getOne: vi.fn().mockResolvedValue(job),
    }),
  }
}

function mountJobListing(pb, routeQuery = { id: 'job1' }) {
  return mount(JobListing, {
    global: {
      config: {
        globalProperties: {
          pocketbase: pb,
          $route: { query: routeQuery },
        },
      },
      stubs: {
        'b-container': { template: '<div><slot /></div>' },
        'b-row': { template: '<div><slot /></div>' },
        'b-col': { template: '<div><slot /></div>' },
        'b-card': { template: '<div class="b-card"><slot /></div>' },
        'b-badge': { template: '<span class="b-badge"><slot /></span>' },
      },
    },
  })
}

describe('JobListing', () => {
  let pb

  beforeEach(() => {
    pb = createMockPocketBase()
  })

  it('fetches the job by ID from route query', async () => {
    mountJobListing(pb)
    await flushPromises()

    expect(pb.collection).toHaveBeenCalledWith('jobs')
    expect(pb.collection.mock.results[0].value.getOne).toHaveBeenCalledWith('job1')
  })

  it('displays the job title and company', async () => {
    const wrapper = mountJobListing(pb)
    await flushPromises()

    expect(wrapper.text()).toContain('Senior Developer')
    expect(wrapper.text()).toContain('Acme Corp')
  })

  it('displays "Posted" date formatted from job.approved_at', async () => {
    const wrapper = mountJobListing(pb)
    await flushPromises()

    expect(wrapper.text()).toContain('Posted Jan 15, 2025')
  })

  it('displays salary badge with min-max format', async () => {
    const wrapper = mountJobListing(pb)
    await flushPromises()

    expect(wrapper.find('.b-badge').text()).toBe('$100-150K')
  })

  it('displays salary as $minK (min) when only min is set', async () => {
    const job = { ...mockJob, salary_max: 0 }
    const localPb = createMockPocketBase(job)
    const wrapper = mountJobListing(localPb)
    await flushPromises()

    expect(wrapper.find('.b-badge').text()).toBe('$100K (min)')
  })

  it('displays salary as $maxK (max) when only max is set', async () => {
    const job = { ...mockJob, salary_min: 0 }
    const localPb = createMockPocketBase(job)
    const wrapper = mountJobListing(localPb)
    await flushPromises()

    expect(wrapper.find('.b-badge').text()).toBe('$150K (max)')
  })

  it('sanitizes HTML in description', async () => {
    const job = {
      ...mockJob,
      description: '<p>Hello</p><script>alert("xss")</script>',
    }
    const localPb = createMockPocketBase(job)
    const wrapper = mountJobListing(localPb)
    await flushPromises()

    const descDiv = wrapper.find('.job-description')
    expect(descDiv.html()).toContain('<p>Hello</p>')
    expect(descDiv.html()).not.toContain('<script>')
  })

  it('sanitizes HTML in how_to_apply', async () => {
    const job = {
      ...mockJob,
      how_to_apply: '<p>Apply</p><img src=x onerror=alert(1)>',
    }
    const localPb = createMockPocketBase(job)
    const wrapper = mountJobListing(localPb)
    await flushPromises()

    const applyDiv = wrapper.find('.job-how-to-apply')
    expect(applyDiv.html()).toContain('<p>Apply</p>')
    expect(applyDiv.html()).not.toContain('onerror')
  })

  it('renders how_to_apply section only when present', async () => {
    const job = { ...mockJob, how_to_apply: '' }
    const localPb = createMockPocketBase(job)
    const wrapper = mountJobListing(localPb)
    await flushPromises()

    expect(wrapper.find('.how-to-apply').exists()).toBe(false)
  })

  it('does not fetch when no job ID is in route query', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mountJobListing(pb, {})
    await flushPromises()

    expect(pb.collection).not.toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith('No jobId provided in query parameters.')
    consoleSpy.mockRestore()
  })
})
