import type { PageRequestParams, PaginationResult } from '/#/axios'

import { defHttp } from '/@/utils/http/axios'

export const Api = {
  page: '/jobs/search',
  add: '/jobs/add',
  update: '/jobs/update',
  delete: '/jobs/delete',
}

export interface JobsResult {
  job_id: number
  job_name: string
  job_group: number
  job_type: number
  cron_expression: string
  invoke_target: string
  status: number
}
export async function getJobsPageRequest(
  params: PageRequestParams
): Promise<PaginationResult<JobsResult>> {
  return await defHttp.post({ url: Api.page, params })
}

export async function addJobsRequest(data: Omit<JobsResult, 'id'>) {
  return await defHttp.post({ url: Api.add, data })
}

export async function updateJobsRequest(data: JobsResult) {
  return await defHttp.post({ url: Api.update, data })
}

export async function deleteJobsRequest(data: { id: number }) {
  return await defHttp.post({ url: Api.delete, data })
}
