
<template>
  <header class='header'>
    <RouterLink to='/' class='header-left'>
      <img src='@/assets/favicon.png' alt='verni sotku icon' class='header-img'>
      <p class='header-title'>Верни сотку</p>
    </RouterLink>
    <div class='header-right'>
      <RouterLink class='header-link' to='/about'>
        О нас
      </RouterLink>
      <RouterLink v-if='store.user?.name' class='header-link'  :to='`/user/${store.user.uuid}`'>
        {{ store.user.name }} 😎
      </RouterLink>
      <RouterLink v-else class='header-link' to='/user/sign-in'>
        Войти 🐺
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang='ts'>
import {ref} from "vue";
import {useUserStore} from "@/stores/user.ts";

const store = useUserStore()

const uid = ref<string>();
uid.value = store.userId || localStorage?.getItem('userId')

</script>

<style lang='scss'>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #555555;
  padding: 16px;

  &-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
  }

  &-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
    padding-right: 32px;
  }

  &-link {
    font-size: 24px;
    font-weight: 200;
    transition: all 0.2s;

    &::after {
      content: '';
      width: 0;
      height: 2px;
      display: block;
      background: #3B666B;
      transition: 300ms;
    }

    &:hover::after {
      width: 100%;
    }
  }

  &-img {
    height: 64px;
    width: 64px;
  }

  &-title {
    font-size: 40px;
    font-weight: 200;
  }
}
@media screen and (max-width: 500px) {
  .header {
    &-left {
      gap: 16px
    }
    &-right {
      gap: 8px;
    }
    &-img {
      height: 32px;
      width: 32px;
    }
    &-title {
      font-size: 16px;
    }
    &-link {
      font-size: 16px;
    }
  }
}
</style>
