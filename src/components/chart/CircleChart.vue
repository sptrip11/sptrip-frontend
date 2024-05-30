<template>
	<div>
		<svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
			<circle :cx="size / 2" :cy="size / 2" :r="radius" fill="transparent" stroke="#ddd" :stroke-width="strokeWidth" />
			<circle
				:cx="size / 2"
				:cy="size / 2"
				:r="radius"
				fill="transparent"
				stroke="#4caf50"
				:stroke-width="strokeWidth"
				:stroke-dasharray="`${circumference} ${circumference}`"
				:stroke-dashoffset="circumference - (value / max) * circumference"
			/>
		</svg>
		<div class="value-text">{{ Math.round(value) / 10 }}</div>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Number,
			required: true,
		},
		max: {
			type: Number,
			required: true,
		},
		size: {
			type: Number,
			default: 50,
		},
		strokeWidth: {
			type: Number,
			default: 5,
		},
	},
	computed: {
		radius() {
			return (this.size - this.strokeWidth) / 2;
		},
		circumference() {
			return 2 * Math.PI * this.radius;
		},
	},
};
</script>

<style scoped>
.value-text {
	position: relative;
	bottom: 3.2rem;
	font-size: 1.2rem;
	font-weight: bold;
	text-align: center;
	margin-top: 0.5rem;
}
</style>
