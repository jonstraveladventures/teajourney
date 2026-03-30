/* ============================================================
   THE TEA JOURNEY — Charts (Chart.js)
   ============================================================ */

const CHARTS = {};

function initProductionChart() {
    if (CHARTS.production) return;
    const ctx = document.getElementById('productionChart');
    if (!ctx) return;

    const data = TEA_DATA.historicalProduction;

    CHARTS.production = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'China',
                    data: data.datasets.china,
                    borderColor: '#C8872B',
                    backgroundColor: 'rgba(200, 135, 43, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#C8872B',
                },
                {
                    label: 'India',
                    data: data.datasets.india,
                    borderColor: '#4A7C59',
                    backgroundColor: 'rgba(74, 124, 89, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#4A7C59',
                },
                {
                    label: 'Ceylon / Sri Lanka',
                    data: data.datasets.ceylon,
                    borderColor: '#e67e22',
                    backgroundColor: 'rgba(230, 126, 34, 0.05)',
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: '#e67e22',
                },
                {
                    label: 'Kenya',
                    data: data.datasets.kenya,
                    borderColor: '#8B2500',
                    backgroundColor: 'rgba(139, 37, 0, 0.05)',
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: '#8B2500',
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { family: "'Source Sans 3', sans-serif", size: 13 },
                        usePointStyle: true,
                        padding: 20,
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + 'K tonnes';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Production (thousands of tonnes)',
                        font: { family: "'Source Sans 3', sans-serif", size: 12 },
                    },
                    ticks: {
                        callback: function(value) { return value.toLocaleString(); },
                        font: { size: 11 },
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: { family: "'Source Sans 3', sans-serif", size: 12 },
                    },
                    ticks: { font: { size: 11 } },
                    grid: { display: false },
                }
            }
        }
    });
}

function initBarChart() {
    if (CHARTS.bar) return;
    const ctx = document.getElementById('barChart');
    if (!ctx) return;

    // Sort by production descending, take top 15
    const sorted = [...TEA_DATA.productionData]
        .sort((a, b) => b.production - a.production)
        .slice(0, 15);

    const colors = sorted.map(d => {
        if (d.production >= 1000000) return '#1a5e0f';
        if (d.production >= 500000) return '#2d7a1e';
        if (d.production >= 100000) return '#5a9e3f';
        if (d.production >= 50000) return '#8cc269';
        return '#c6e2a8';
    });

    CHARTS.bar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(d => d.country),
            datasets: [{
                label: 'Annual Production (tonnes)',
                data: sorted.map(d => d.production),
                backgroundColor: colors,
                borderColor: colors.map(c => c),
                borderWidth: 1,
                borderRadius: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const d = sorted[context.dataIndex];
                            return [
                                d.production.toLocaleString() + ' tonnes/year',
                                'Tea types: ' + d.teaType,
                                'Learned from: ' + d.learnedFrom,
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Annual Production (tonnes)',
                        font: { family: "'Source Sans 3', sans-serif", size: 12 },
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                            if (value >= 1000) return (value / 1000) + 'K';
                            return value;
                        },
                        font: { size: 11 },
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                },
                y: {
                    ticks: {
                        font: { family: "'Source Sans 3', sans-serif", size: 12, weight: '600' },
                    },
                    grid: { display: false },
                }
            }
        }
    });
}

/* ---- Knowledge Tree SVG ---- */
function initKnowledgeTree() {
    const svg = document.getElementById('treeSvg');
    if (!svg || svg.children.length > 0) return;

    const tree = TEA_DATA.knowledgeTree;

    // Draw edges first
    tree.edges.forEach(edge => {
        const fromNode = tree.nodes.find(n => n.id === edge.from);
        const toNode = tree.nodes.find(n => n.id === edge.to);
        if (!fromNode || !toNode) return;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromNode.x);
        line.setAttribute('y1', fromNode.y + 18);
        line.setAttribute('x2', toNode.x);
        line.setAttribute('y2', toNode.y - 8);
        line.setAttribute('stroke', fromNode.color);
        line.setAttribute('stroke-width', '1.5');
        line.setAttribute('stroke-opacity', '0.4');
        line.setAttribute('stroke-dasharray', '4 3');
        svg.appendChild(line);

        // Arrow head
        const angle = Math.atan2(toNode.y - 8 - (fromNode.y + 18), toNode.x - fromNode.x);
        const arrowLen = 8;
        const ax = toNode.x - arrowLen * Math.cos(angle - 0.4);
        const ay = toNode.y - 8 - arrowLen * Math.sin(angle - 0.4);
        const bx = toNode.x - arrowLen * Math.cos(angle + 0.4);
        const by = toNode.y - 8 - arrowLen * Math.sin(angle + 0.4);

        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        arrow.setAttribute('points', `${toNode.x},${toNode.y - 8} ${ax},${ay} ${bx},${by}`);
        arrow.setAttribute('fill', fromNode.color);
        arrow.setAttribute('opacity', '0.5');
        svg.appendChild(arrow);
    });

    // Draw nodes
    tree.nodes.forEach(node => {
        const isLarge = node.size === 'large';
        const r = isLarge ? 22 : 16;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', node.color);
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('opacity', '0.9');
        svg.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + r + 16);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-family', "'Source Sans 3', sans-serif");
        text.setAttribute('font-size', isLarge ? '12' : '10');
        text.setAttribute('font-weight', isLarge ? '700' : '600');
        text.setAttribute('fill', '#3a3a3a');
        text.textContent = node.label;
        svg.appendChild(text);
    });
}

/* ---- Chart init dispatcher ---- */
const CHART_INITIALIZERS = {
    'productionChart': initProductionChart,
    'barChart': initBarChart,
    'treeSvg': initKnowledgeTree,
};

function initChartIfVisible(chartId) {
    const init = CHART_INITIALIZERS[chartId];
    if (init) init();
}
