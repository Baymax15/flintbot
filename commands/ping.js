const { DEFAULT_EMBED_COLOR } = require('../config.json');

module.exports = {
	data: {
		name: 'ping',
		description: 'Checks response time of bot to discord.',
	},
	async execute(interaction) {
		const msg = await interaction.reply({ content: 'pong!', fetchReply: true });
		const pingEmbed = {
			color: DEFAULT_EMBED_COLOR,
			title: 'Ping',
			fields: [
				{ name: 'Latency', value: `${msg.createdTimestamp - interaction.createdTimestamp} ms.` },
				{ name: 'Api Latency', value: `${Math.round(interaction.client.ws.ping)} ms.` },
			],
		};
		interaction.editReply({ embeds: [pingEmbed] });
	},
};