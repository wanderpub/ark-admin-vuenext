import type { MenuSetting } from '/#/config'

import { computed, unref } from 'vue'
import { useAppStore } from '/@/stores/modules/app'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)

  const getUniqueOpened = computed(() => appStore.getMenuSetting.uniqueOpened)

  function setMenuSetting(menuSetting: Partial<MenuSetting>) {
    appStore.setProjectConfig({ menuSetting })
  }

  function toggleCollapse() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }

  return {
    setMenuSetting,
    toggleCollapse,

    getCollapsed,
    getUniqueOpened,
  }
}