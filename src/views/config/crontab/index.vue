<template>
  <PageWrapper>
    <BasicTable
      :api="getJobsPageRequest"
      @register="registerTable"
      row-key="job_id"
      :columns="createColumns()"
    >
      <template #toolbar>
        <ElButton
          type="primary"
          @click="openEditJobFormDialog()"
          :disabled="!hasPermission(Api.add)"
        >
          新增
        </ElButton>
      </template>

      <template #group="{ row }">
        <ElTag>{{ formatterGroup(row.job_group) }}</ElTag>
      </template>

      <template #action="{ row }">
        <BasicTableAction
          :actions="[
            {
              label: '编辑',
              onClick: openEditJobFormDialog.bind(null, row),
              disabled: !hasPermission(Api.update),
            },
            {
              label: '删除',
              popconfirm: true,
              type: 'danger',
              onClick: handleDelete.bind(null, row),
              disabled: !hasPermission(Api.delete),
            },
          ]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script setup lang="ts">
import type { JobsResult } from '/@/api/config/jobs'

import { PageWrapper } from '/@/components/Page'
import { BasicTable, useTable, BasicTableAction } from '/@/components/Table'
import {
  getJobsPageRequest,
  deleteJobsRequest,
  addJobsRequest,
  updateJobsRequest,
  Api,
} from '/@/api/config/jobs'
import { usePermission } from '/@/composables/core/usePermission'
import { createColumns } from './columns'
import { createSchemas } from './schemas'
import { createFormDialog } from '/@/components/Form'
import { ref } from 'vue'

const { hasPermission } = usePermission()

const [registerTable, { reload }] = useTable()

const fdInstance = createFormDialog({
  formProps: { schemas: createSchemas(), labelWidth: '100px' },
  dialogProps: { title: '编辑任务信息' },
  submit: async (res: Omit<JobsResult, 'id'>, { showLoading, hideLoading, close }) => {
    try {
      showLoading()

      if (updateJobId.value === null) {
        await addJobsRequest(res)
      } else {
        await updateJobsRequest({
          ...res,
          id: updateJobId.value,
        })
      }

      close()

      reload()
    } finally {
      hideLoading()
    }
  },
})

const updateJobId = ref<number | null>(null)

function openEditJobFormDialog(update?: JobsResult) {
  fdInstance.open(({ getFormAction }) => {
    if (update) {
      updateJobId.value = update.job_id
      getFormAction()?.setFormModel(update)
    } else {
      updateJobId.value = null
    }
  })
}

async function handleDelete(row: JobsResult) {
  await deleteJobsRequest({ id: row.job_id })
  reload()
}

function formatterGroup(type: number) {
  switch (type) {
    case 0:
      return '默认'
    case 1:
      return '系统'
  }
}
</script>
