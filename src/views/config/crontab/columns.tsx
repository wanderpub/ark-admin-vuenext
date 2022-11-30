import type { TableColumn } from '/@/components/Table'
import { StatusTypeEnum } from '/@/enums/typeEnum'

export function createColumns(): TableColumn[] {
  return [
    {
      type: 'index',
    },
    {
      label: '任务名称',
      prop: 'job_name',
    },
    {
      label: '任务分组',
      prop: 'job_group',
      slot: 'group',
    },
    {
      label: '任务表达式',
      prop: 'cron_expression',
    },
    {
      label: '调用目标',
      prop: 'invoke_target',
    },
    {
      align: 'center',
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return (
          <el-tag type={row.status === StatusTypeEnum.Enable ? 'success' : 'danger'}>
            {row.status === StatusTypeEnum.Disable ? '禁用' : '启用'}
          </el-tag>
        )
      },
    },
    {
      align: 'center',
      label: '操作',
      slot: 'action',
      width: 140,
      fixed: 'right',
    },
  ]
}
