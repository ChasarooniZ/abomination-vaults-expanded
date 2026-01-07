const start = { x: 3525, y: 7725 };

const crop_poly = [
	[
		{ x: 0, y: 1409 },
		{ x: 0, y: 450 },
		{ x: 162, y: 451 },
		{ x: 497, y: 0 },
		{ x: 1500, y: 59 },
	],
	[
		{ x: 0, y: 1500 },
		{ x: 1650, y: 0 },
		{ x: 1650, y: 1500 },
	],
	[
		{ x: 0, y: 0 },
		{ x: 1560, y: 0 },
		{ x: 1650, y: 1500 },
	],
	[
		{ x: 0, y: 0 },
		{ x: 1650, y: 1500 },
		{ x: 497, y: 1410 },
		{ x: 159, y: 961 },
		{ x: 0, y: 961 },
	],
	[
		{ x: 1500, y: 0 },
		{ x: 1500, y: 961 },
		{ x: 1342, y: 961 },
		{ x: 1003, y: 1408 },
		{ x: 0, y: 1500 },
	],
	[
		{ x: 1500, y: 0 },
		{ x: 0, y: 1500 },
		{ x: 91, y: 421 },
		{ x: 542, y: 159 },
		{ x: 542, y: 0 },
	],
	[
		{ x: 1500, y: 1500 },
		{ x: 542, y: 1500 },
		{ x: 542, y: 1341 },
		{ x: 91, y: 1003 },
		{ x: 0, y: 0 },
	],
	[
		{ x: 1500, y: 1500 },
		{ x: 0, y: 0 },
		{ x: 1005, y: 91 },
		{ x: 1340, y: 541 },
		{ x: 1500, y: 541 },
	],
];

const poly_width_height = [
	{ x: 1500, y: 1409 },
	{ x: 1650, y: 1500 },
	{ x: 1650, y: 1500 },
	{ x: 1650, y: 1500 },
	{ x: 1500, y: 1500 },
	{ x: 1500, y: 1500 },
	{ x: 1500, y: 1500 },
	{ x: 1500, y: 1500 },
];

const poly_pos = [
	{ x: 3525, y: 6316 },
	{ x: 3525, y: 6225 },
	{ x: 3525, y: 7725 },
	{ x: 3525, y: 7725 },
	{ x: 2025, y: 7725 },
	{ x: 2025, y: 7725 },
	{ x: 2025, y: 6225 },
	{ x: 2025, y: 6225 },
];
// Define the locations for the animation effect
const location_smol = [
	{ x: 3843, y: 7077 },
	{ x: 4197, y: 7470 },
	{ x: 4183, y: 8010 },
	{ x: 3807, y: 8372 },
	{ x: 3268, y: 8401 },
	{ x: 2839, y: 7934 },
	{ x: 2894, y: 7339 },
	{ x: 3214, y: 7049 },
];

const locations = [
	{ x: 4275, y: 6375 },
	{ x: 5025, y: 7125 },
	{ x: 5025, y: 8475 },
	{ x: 4125, y: 9075 },
	{ x: 2925, y: 9075 },
	{ x: 2175, y: 8175 },
	{ x: 2175, y: 7125 },
	{ x: 2925, y: 6375 },
];
export async function belcorrasGrasp() {
	console.log(locations);

	// Define file paths for animation and sound effect
	const animationFile = "jb2a.detect_magic.cone.blue";
	const soundFile
		= "modules/abomination-vaults-expanded/assets/audio/belcorras-grasp-wave.ogg";

	// Check if required modules are installed
	const areModulesInstalled = !!Sequencer?.Database?.getEntry(
		"jb2a.detect_magic.cone.blue",
	);
	if (!areModulesInstalled) {
		ui.notifications.error(
			"This animation macro requires Sequencer + JB2A Patreon (or Free) to run. Please add and activate these modules to use this macro.",
		);
		return;
	}

	// Preload assets
	// await Sequencer.Preloader.preloadForClients([animationFile, soundFile]);

	// Define image properties for the dialog
	const dialogImage = {
		src: "modules/abomination-vaults-expanded/assets/guides/belcorra_wave_attack.webp",
		width: 250,
		height: 250,
	};

	await setupMaskingDrawings();

	// Function to handle click event on the image
	async function handleImageClick(event) {
		const { offsetX, offsetY, type } = event;
		const isLong = type === "click";
		const locationIndex = findNearestLocation(offsetX, offsetY) - 1;
		// console.log({location: locations[locationIndex], poly: crop_poly[locationIndex]})
		const cropDrawing = getRelevantMaskDrawing(crop_poly[locationIndex]);

		new Sequence()
			.effect()
			.playbackRate(1)
			.file(animationFile)
			.aboveLighting()
			.filter("ColorMatrix", { hue: -35 })
			.atLocation(start)
			.stretchTo(
				isLong ? locations[locationIndex] : location_smol[locationIndex],
			)
			.mask(cropDrawing)
			.sound()
			.file(soundFile)
			.volume(0.7)
			.play();
	}

	// Create and render the dialog
	new Dialog({
		title: "Select Direction to send Belcorra's Grasp",
		content: `
        <div style="text-align:center; min-width=530px">
            <img src="${dialogImage.src}" width="${dialogImage.width}" height="${dialogImage.height}" style="cursor:pointer;" id="clickable-image">
        </div>
    `,
		buttons: { ok: { label: "Close", callback: () => {} } },
		render: (html) => {
			html[0]
				.querySelector("#clickable-image")
				.addEventListener("click", handleImageClick);
			html[0]
				.querySelector("#clickable-image")
				.addEventListener("contextmenu", handleImageClick);
		},
	}).render(true, { width: "auto", height: "auto" });

	// Function to find the nearest location based on click coordinates
	function findNearestLocation(x, y) {
		const referencePoints = [
			{ name: 1, x: 150.67, y: 50.67 },
			{ name: 2, x: 184.67, y: 92 },
			{ name: 3, x: 188, y: 159 },
			{ name: 4, x: 149.67, y: 184 },
			{ name: 5, x: 95.67, y: 188 },
			{ name: 6, x: 59.67, y: 152 },
			{ name: 7, x: 47.33, y: 83.67 },
			{ name: 8, x: 90.67, y: 49.33 },
		];

		return referencePoints.reduce(
			(nearest, point) => {
				const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
				return distance < nearest.distance
					? { name: point.name, distance }
					: nearest;
			},
			{ name: 1, distance: Infinity },
		).name;
	}
}

async function setupMaskingDrawings() {
	let i = 0;
	const scene = game.scenes.get("o3zbh5CXtTQiWKwZ");
	for (const polygon of crop_poly) {
		if (getRelevantMaskDrawing(polygon)) return false;
		const data = {
			...poly_pos[i],
		};
		const points = [];
		for (const pair of polygon) {
			points.push(pair.x);
			points.push(pair.y);
		}
		const shape = {
			width: poly_width_height[i].x,
			height: poly_width_height[i].y,
			type: "p",
			points,
		};
		data.shape = shape;
		await setupDrawing(data, scene);
		i++;
	}
}

async function setupDrawing(data, scene) {
	const drawingData = {
		author: game.user,
		hidden: true,
		interface: data.interface,
		locked: true,
		strokeWidth: 1,
		strokeAlpha: 0.1,
		x: data.x,
		y: data.y,
		shape: data.shape,
	};
	await DrawingDocument.create(drawingData, { parent: scene });
}

function getRelevantMaskDrawing(points) {
	return canvas.drawings.placeables.find(
		draw =>
			draw.document.shape.points[0] == points[0].x
			&& draw.document.shape.points[1] == points[0].y
			&& draw.document.shape.points[2] == points[1].x
			&& draw.document.shape.points[3] == points[1].y,
	);
}
