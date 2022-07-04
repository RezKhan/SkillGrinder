<template>
    <div class="progress-bar">
        <div class="progress-inner">
            <span>Some Value 0%"</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'progressbar'
};
</script>

<style>
    .progress-bar {
        width: 100%;
        height: 20px;
        background-color: #FFF;
        position: relative;
    }

    .progress-inner {
        height: 100%;
        background-image: linear-gradient(to right, #CA0012, #FF2100);
        border-radius: 10px;
    }

    .progress-inner span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #FFF;
        font-size: 16px;
    }
</style>