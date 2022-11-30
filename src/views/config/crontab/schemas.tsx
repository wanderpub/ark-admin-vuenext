import type { FormSchema } from '/@/components/Form'

export function createSchemas(): FormSchema[] {
  return [
    {
      label: '任务名称',
      prop: 'job_name',
      defaultValue: '',
      component: 'ElInput',
      rules: {
        required: true,
        type: 'string',
        message: '请输入任务名称',
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: '任务分组',
      prop: 'job_group',
      defaultValue: 0,
      component: 'ElTreeSelect',
      componentProps: {
        data: [{
          label: '默认',
          value: 0,
        },
        {
          label: '系统',
          value: 1,
        }],
        checkStrictly: true,
        nodeKey: 'value',
        renderAfterExpand: false,
        props: {
          label: (data: Recordable): string => {
            return data.label
          },
        },
      },
      rules: {
        required: true,
        type: 'number',
        min: 0,
        message: '请选择',
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: '调用目标',
      prop: 'invoke_target',
      defaultValue: '',
      component: 'ElInput',
      rules: {
        required: true,
        type: 'string',
        message: '请输入调用目标',
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: '目标参数',
      prop: 'args',
      component: 'ElInput',
      defaultValue: '',
      colProps: {
        span: 12,
      },
    },
    {
      label: 'Cron表达式',
      prop: 'cron_expression',
      defaultValue: '',
      component: 'ElInput',
      rules: {
        required: true,
        type: 'string',
        message: '请输入Cron表达式',
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: '任务类型',
      prop: 'job_type',
      defaultValue: 0,
      component: 'ElTreeSelect',
      componentProps: {
        data: [{
          label: '外部接口',
          value: 0,
        },
        {
          label: '系统函数',
          value: 1,
        }],
        checkStrictly: true,
        nodeKey: 'value',
        renderAfterExpand: false,
        props: {
          label: (data: Recordable): string => {
            return data.label
          },
        },
      },
      rules: {
        required: true,
        type: 'number',
        min: 0,
        message: '请选择',
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: '状态',
      defaultValue: 1,
      prop: 'status',
      render: ({ model }) => {
        return (
          <el-radio-group v-model={model.status}>
            <el-radio label={1}>启用</el-radio>
            <el-radio label={0}>禁用</el-radio>
          </el-radio-group>
        )
      },
      colProps: {
        span: 12,
      },
    }
  ]
}
