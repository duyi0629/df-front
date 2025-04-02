<script setup lang="ts"></script>
<template>
    <div v-for="item in 7" >
        <div class="flex w-full px-2 mb-3">
            <Skeleton class="h-[100px] w-[150px]" />
            <div class="w-full flex flex-col justify-between ml-1">
                <Skeleton class="h-[30px] w-full" />
                <Skeleton class="h-[30px] w-full" />
                <Skeleton class="h-[30px] w-full" />
            </div>
        </div>
  </div>
</template>

<style lang="scss" scoped></style>
