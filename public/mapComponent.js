
// Moscow map and choropleth chart functionality
function createMoscowMap() {
    // Moscow districts data
    const moscowDistricts = [
        {
            id: 'central',
            name: 'Central Administrative District',
            status: 'planted',
            trees_planted: 835,
            target_trees: 1000,
            team_lead: 'Maria Ivanova',
            area_hectares: 66,
            last_planted: '2023-10-15',
            description: 'Urban beautification project focused on historical areas'
        },
        {
            id: 'northern',
            name: 'Northern Administrative District',
            status: 'planted',
            trees_planted: 1240,
            target_trees: 1500,
            team_lead: 'Alexei Petrov',
            area_hectares: 113,
            last_planted: '2023-11-20',
            description: 'Park restoration with native Russian birch and pine species'
        },
        {
            id: 'eastern',
            name: 'Eastern Administrative District',
            status: 'unplanted',
            trees_planted: 0,
            target_trees: 1200,
            team_lead: 'Olga Smirnova',
            area_hectares: 95,
            last_planted: null,
            description: 'Planned forest buffer zone to improve air quality'
        },
        {
            id: 'southern',
            name: 'Southern Administrative District',
            status: 'unplanted',
            trees_planted: 0,
            target_trees: 900,
            team_lead: 'Dmitry Sokolov',
            area_hectares: 71,
            last_planted: null,
            description: 'Future ecological corridor connecting existing green spaces'
        },
        {
            id: 'western',
            name: 'Western Administrative District',
            status: 'planted',
            trees_planted: 1497,
            target_trees: 1500,
            team_lead: 'Natalia Kuznetsova',
            area_hectares: 153,
            last_planted: '2023-09-05',
            description: 'Successful reforestation of previously degraded land'
        },
        {
            id: 'northwestern',
            name: 'Northwestern Administrative District',
            status: 'planted',
            trees_planted: 952,
            target_trees: 1100,
            team_lead: 'Igor Volkov',
            area_hectares: 87,
            last_planted: '2023-10-28',
            description: 'Community garden and forest initiative with local schools'
        },
        {
            id: 'southeastern',
            name: 'Southeastern Administrative District',
            status: 'unplanted',
            trees_planted: 0,
            target_trees: 800,
            team_lead: 'Anastasia Orlova',
            area_hectares: 62,
            last_planted: null,
            description: 'Planned industrial zone greening project for 2024'
        }
    ];

    // Create GeoJSON-like structure for the Moscow districts
    const moscowGeoJSON = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                id: "central",
                properties: {
                    name: "Central Administrative District",
                    trees_planted: 835,
                    status: "planted"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [250, 250], [300, 200], [350, 250], [300, 300], [250, 250]
                    ]]
                }
            },
            {
                type: "Feature",
                id: "northern",
                properties: {
                    name: "Northern Administrative District",
                    trees_planted: 1240,
                    status: "planted"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [250, 150], [350, 100], [400, 200], [300, 200], [250, 150]
                    ]]
                }
            },
            {
                type: "Feature",
                id: "eastern",
                properties: {
                    name: "Eastern Administrative District",
                    trees_planted: 320,
                    status: "unplanted"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [400, 200], [500, 175], [475, 275], [375, 275], [400, 200]
                    ]]
                }
            },
            {
                type: "Feature",
                id: "southern",
                properties: {
                    name: "Southern Administrative District",
                    trees_planted: 580,
                    status: "unplanted"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [300, 300], [400, 275], [350, 375], [250, 350], [300, 300]
                    ]]
                }
            },
            {
                type: "Feature",
                id: "western",
                properties: {
                    name: "Western Administrative District",
                    trees_planted: 1497,
                    status: "planted"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [150, 200], [250, 150], [300, 200], [250, 300], [175, 275], [150, 200]
                    ]]
                }
            },
            {
                type: "Feature",
                id: "northwestern",
                properties: {
                    name: "Northwestern Administrative District",
                    trees_planted: 952,
                    status: "planted"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [175, 150], [250, 100], [300, 150], [250, 200], [175, 175], [175, 150]
                    ]]
                }
            },
            {
                type: "Feature",
                id: "southeastern",
                properties: {
                    name: "Southeastern Administrative District",
                    trees_planted: 470,
                    status: "unplanted"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [375, 275], [475, 275], [450, 375], [350, 375], [375, 275]
                    ]]
                }
            }
        ]
    };

    // Set up dimensions
    const width = document.querySelector('.moscow-map-container').clientWidth;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(".moscow-map-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    // Create a group for the map and apply margin
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create tooltip
    const tooltip = d3.select("#map-tooltip");

    // Add background
    g.append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("fill", "#f8f9fa")
        .attr("rx", 10);

    // Add Moscow city outer border
    const moscowOuterCoords = [
        [margin.left + 100, margin.top + 50],
        [margin.left + 200, margin.top + 30],
        [margin.left + 350, margin.top + 50],
        [margin.left + 450, margin.top + 150],
        [margin.left + 475, margin.top + 250],
        [margin.left + 425, margin.top + 350],
        [margin.left + 300, margin.top + 400],
        [margin.left + 175, margin.top + 350],
        [margin.left + 100, margin.top + 225],
        [margin.left + 100, margin.top + 50]
    ];

    g.append("path")
        .attr("d", "M" + moscowOuterCoords.map(point => point.join(",")).join("L") + "Z")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.5);

    // Create color scale for choropleth
    const colorScale = d3.scaleSequential()
        .domain([0, 1500])
        .interpolator(d3.interpolateGreens);

    // Draw the districts with animation
    const districtPaths = g.selectAll(".district")
        .data(moscowGeoJSON.features)
        .enter()
        .append("path")
        .attr("class", "district")
        .attr("d", d => {
            // Create a path from the coordinates
            return "M" + d.geometry.coordinates[0].map(point => point.join(",")).join("L") + "Z";
        })
        .attr("fill", d => {
            const districtData = moscowDistricts.find(item => item.id === d.id);
            return districtData ? colorScale(districtData.trees_planted) : "#e5e5e5";
        })
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .attr("opacity", 0);

    // Add staggered fade-in animation
    districtPaths.transition()
        .duration(500)
        .delay((d, i) => i * 100)
        .attr("opacity", 0.85);

    districtPaths.on("mouseover", function(event, d) {
            // Only highlight the border on hover, not the fill
            d3.select(this)
                .attr("stroke", "#333")
                .attr("stroke-width", 2);

            // Get district data
            const districtData = moscowDistricts.find(item => item.id === d.id);

            // Show tooltip with improved animation
            if (districtData) {
                const progress = districtData.status === 'planted'
                    ? Math.round((districtData.trees_planted / districtData.target_trees) * 100)
                    : 0;

                tooltip
                    .classed("visible", true)
                    .style("left", (event.pageX + 15) + "px")
                    .style("top", (event.pageY - 20) + "px")
                    .html(`
                        <div class="tooltip-header ${districtData.status}">
                            <h5>${districtData.name}</h5>
                            <span class="status-badge">${districtData.status === 'planted' ? 'Planted' : 'Needs Trees'}</span>
                        </div>
                        <div class="tooltip-body">
                            ${districtData.status === 'planted' ?
                              `<p><strong>Trees Planted:</strong> ${districtData.trees_planted} of ${districtData.target_trees}</p>
                               <div class="progress" style="height: 8px; margin-bottom: 10px;">
                                 <div class="progress-bar bg-success" role="progressbar" style="width: ${progress}%;"
                                      aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
                               </div>
                               <p><strong>Last Planted:</strong> ${districtData.last_planted}</p>
                               <p><strong>Team Lead:</strong> ${districtData.team_lead}</p>` :
                              `<p><strong>Target Trees:</strong> ${districtData.target_trees}</p>
                               <p><strong>Planned Start:</strong> 2024</p>`
                            }
                            <p><strong>Area:</strong> ${districtData.area_hectares} hectares</p>
                            <p><strong>Description:</strong> ${districtData.description}</p>
                        </div>
                    `);
            }
        })
        .on("mouseout", function() {
            // Restore original styling
            d3.select(this)
                .attr("stroke", "#fff")
                .attr("stroke-width", 1);

            // Hide tooltip with class for better animation
            tooltip.classed("visible", false);
        });

    // Add district labels
    g.selectAll(".district-label")
        .data(moscowGeoJSON.features)
        .enter()
        .append("text")
        .attr("class", "district-label")
        .attr("x", d => {
            // Calculate centroid X
            const coords = d.geometry.coordinates[0];
            const xValues = coords.map(point => point[0]);
            return d3.mean(xValues);
        })
        .attr("y", d => {
            // Calculate centroid Y
            const coords = d.geometry.coordinates[0];
            const yValues = coords.map(point => point[1]);
            return d3.mean(yValues);
        })
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "#333")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("pointer-events", "none")
        .text(d => d.id.substring(0, 3).toUpperCase());

    // Add map title
    g.append("text")
        .attr("x", innerWidth / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .attr("fill", "#333")
        .text("Moscow Region Tree Planting Initiatives");

    // Add legend
    const legendWidth = 300;
    const legendHeight = 15;
    const legendX = (innerWidth - legendWidth) / 2;
    const legendY = innerHeight - 30;

    // Create gradient for legend
    const defs = svg.append("defs");
    const linearGradient = defs.append("linearGradient")
        .attr("id", "green-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    // Add color stops
    linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", colorScale(0));

    linearGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", colorScale(750));

    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", colorScale(1500));

    // Add legend rectangle
    g.append("rect")
        .attr("x", legendX)
        .attr("y", legendY)
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("fill", "url(#green-gradient)")
        .attr("rx", 3);

    // Add legend title
    g.append("text")
        .attr("x", legendX + legendWidth / 2)
        .attr("y", legendY - 10)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "#333")
        .text("Trees Planted");

    // Add legend ticks
    const legendTicks = [0, 500, 1000, 1500];

    g.selectAll(".legend-tick")
        .data(legendTicks)
        .enter()
        .append("line")
        .attr("class", "legend-tick")
        .attr("x1", d => legendX + (d / 1500) * legendWidth)
        .attr("x2", d => legendX + (d / 1500) * legendWidth)
        .attr("y1", legendY)
        .attr("y2", legendY + legendHeight + 5)
        .attr("stroke", "#333")
        .attr("stroke-width", 1);

    // Add legend labels
    g.selectAll(".legend-label")
        .data(legendTicks)
        .enter()
        .append("text")
        .attr("class", "legend-label")
        .attr("x", d => legendX + (d / 1500) * legendWidth)
        .attr("y", legendY + legendHeight + 20)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#333")
        .text(d => d);

    // Make responsive
    function resizeChart() {
        const width = document.querySelector('.moscow-map-container').clientWidth;
        svg.attr("width", width);
        svg.attr("viewBox", [0, 0, width, height]);
    }

    window.addEventListener('resize', resizeChart);
}

// Global planting area data used to color the globe
const plantedRegionsData = [
  {
    name: "European Russia",
    coordinates: [37.6173, 55.7558], // Moscow
    area_hectares: 1450,
    trees_planted: 5280,
    completion: 85,
    description: "Our main reforestation initiative spanning central Russia",
    details: {
      team_lead: "Alexei Petrov",
      native_species: 42,
      start_date: "2018-04-15"
    }
  },
  {
    name: "Northern Forest",
    coordinates: [30.3351, 59.9343], // St. Petersburg
    area_hectares: 980,
    trees_planted: 3240,
    completion: 72,
    description: "Pine and spruce reforestation in northern climate",
    details: {
      team_lead: "Olga Smirnova",
      native_species: 28,
      start_date: "2019-06-22"
    }
  },
  {
    name: "Kazan Nature Preserve",
    coordinates: [49.1221, 55.7887], // Kazan
    area_hectares: 750,
    trees_planted: 2850,
    completion: 95,
    description: "Mixed forest restoration with community involvement",
    details: {
      team_lead: "Dmitry Sokolov",
      native_species: 35,
      start_date: "2018-09-10"
    }
  },
  {
    name: "Southern Steppe Project",
    coordinates: [39.7012, 47.2357], // Rostov-on-Don
    area_hectares: 620,
    trees_planted: 1860,
    completion: 60,
    description: "Drought-resistant species to combat desertification",
    details: {
      team_lead: "Natalia Kuznetsova",
      native_species: 22,
      start_date: "2020-03-18"
    }
  },
  {
    name: "Sochi Coastal Forest",
    coordinates: [39.7302, 43.6017], // Sochi
    area_hectares: 310,
    trees_planted: 1550,
    completion: 100,
    description: "Subtropical species conservation and restoration",
    details: {
      team_lead: "Igor Volkov",
      native_species: 48,
      start_date: "2019-10-05"
    }
  },
  {
    name: "Ural Mountains Corridor",
    coordinates: [56.8519, 60.6122], // Yekaterinburg
    area_hectares: 880,
    trees_planted: 2640,
    completion: 75,
    description: "High-altitude forest restoration in the Urals",
    details: {
      team_lead: "Maria Ivanova",
      native_species: 31,
      start_date: "2020-05-12"
    }
  },
  {
    name: "Siberian Taiga Preservation",
    coordinates: [82.9346, 55.0415], // Novosibirsk
    area_hectares: 1280,
    trees_planted: 3840,
    completion: 80,
    description: "Coniferous forest protection and expansion",
    details: {
      team_lead: "Pavel Novikov",
      native_species: 25,
      start_date: "2019-08-20"
    }
  },
  {
    name: "Far East Project",
    coordinates: [132.0116, 43.1198], // Vladivostok
    area_hectares: 520,
    trees_planted: 1560,
    completion: 65,
    description: "Unique ecosystems of Russia's Far East",
    details: {
      team_lead: "Anastasia Orlova",
      native_species: 37,
      start_date: "2020-09-15"
    }
  }
];

// Rotating Orthographic Globe Visualization
function createOrthographicGlobe() {
  // Set up dimensions
  const containerWidth = document.querySelector('#moscow-map').clientWidth;
  const width = containerWidth;
  const height = 500; // Reduced height to make room for info section
  const radius = Math.min(width, height) / 2.5;

  // Initial position settings
  const origin = [37.6173, 55.7558]; // Moscow coordinates as center
  const velocity = [0.01, -0.002]; // Rotation velocity
  const t0 = Date.now();

  // Create projection
  const projection = d3.geoOrthographic()
    .scale(radius)
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .precision(0.1)
    .rotate([origin[0], -origin[1], 0]); // Initialize rotation

  // Create path generator
  const path = d3.geoPath()
    .projection(projection);

  // Create SVG
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;")
    .attr("class", "globe-visualization");

  // Create layers for proper stacking order
  const baseMapLayer = svg.append("g").attr("class", "base-map-layer");
  const graticuleLayer = svg.append("g").attr("class", "graticule-layer");
  const landLayer = svg.append("g").attr("class", "land-layer");
  const borderLayer = svg.append("g").attr("class", "border-layer");
  const plantedAreaLayer = svg.append("g").attr("class", "planted-area-layer");
  const controlLayer = svg.append("g").attr("class", "control-layer");

  // Add circle for globe outline in the base layer
  baseMapLayer.append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", radius)
    .attr("fill", "#a6cee3")
    .attr("stroke", "#000")
    .attr("stroke-width", 1.5)
    .attr("opacity", 0.8);

  // Add title
  baseMapLayer.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .attr("fill", "#333")
    .text("Global Tree Planting Initiatives");

  // Storage for planted areas to reference in the details section
  let selectedArea = null;
  const areaDetailsContainer = document.getElementById('globe-details-container');

  // Load world GeoJSON data
  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
    .then(world => {
      // Convert TopoJSON to GeoJSON
      const land = topojson.feature(world, world.objects.land);
      const countries = topojson.feature(world, world.objects.countries);

      // Add ocean background to base layer
      baseMapLayer.append("path")
        .datum({type: "Sphere"})
        .attr("class", "ocean")
        .attr("d", path)
        .attr("fill", "#a6cee3")
        .attr("opacity", 0.8);

      // Add graticule (grid lines) - in their own layer
      const graticule = d3.geoGraticule()
        .step([15, 15]);

      graticuleLayer.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 0.5)
        .attr("stroke-opacity", 0.5);

      // Add land to land layer
      landLayer.append("path")
        .datum(land)
        .attr("class", "land")
        .attr("d", path)
        .attr("fill", "#e5e5e5")
        .attr("stroke", "#000")
        .attr("stroke-width", 0.5)
        .attr("stroke-opacity", 0.5);

      // Add country borders to border layer
      borderLayer.append("path")
        .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
        .attr("class", "boundary")
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", "#333")
        .attr("stroke-width", 0.5)
        .attr("stroke-dasharray", "2,2")
        .attr("stroke-opacity", 0.5);

      // Add planted area circles to planted area layer
      const plantedAreas = plantedAreaLayer.selectAll(".planted-area")
        .data(plantedRegionsData)
        .enter()
        .append("circle")
        .attr("class", "planted-area")
        .attr("fill", d => {
          // Color based on completion percentage
          return d3.interpolateGreens(d.completion / 100);
        })
        .attr("opacity", 0.8)
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .attr("r", d => Math.sqrt(d.area_hectares) / 10 + 5) // Size based on area
        .attr("data-id", d => d.name.replace(/\s+/g, '-').toLowerCase())
        .each(function(d) {
          // Use projection to set initial positions
          const coords = projection(d.coordinates);
          if (coords) {
            d3.select(this)
              .attr("cx", coords[0])
              .attr("cy", coords[1])
              .attr("data-visible", true);
          } else {
            d3.select(this)
              .attr("cx", -1000) // Off-screen
              .attr("cy", -1000)
              .attr("data-visible", false);
          }
        });

      // Add hover and click effects to planted areas
      plantedAreas
        .on("mouseover", function(event, d) {
          if (d3.select(this).attr("data-visible") === "true") {
            d3.select(this)
              .attr("stroke", "#333")
              .attr("stroke-width", 2);

            // Update UI with information instead of showing tooltip
            updateAreaInfo(d);
          }
        })
        .on("mouseout", function() {
          d3.select(this)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5);

          // Don't hide info container immediately to prevent flickering
          // when moving between areas
          setTimeout(() => {
            // Only hide if not hovering over any planted area
            if (!document.querySelector('.planted-area:hover') &&
                !document.querySelector('#globe-details-container .area-details')) {
              hideInfoContainer();
            }
          }, 100);
        })
        .on("click", function(event, d) {
          // Set the selected area and update the details container
          selectedArea = d;
          showAreaDetails(d);

          // Highlight the selected area
          plantedAreas.attr("stroke-width", 0.5).attr("stroke", "#fff");
          d3.select(this)
            .attr("stroke", "#333")
            .attr("stroke-width", 2);
        });

      // Set up rotation animation
      d3.timer(function() {
        // Calculate rotation based on elapsed time
        const t = Date.now() - t0;
        const rotate = [
          origin[0] + velocity[0] * t,
          origin[1] + velocity[1] * t
        ];

        // Update projection rotation
        projection.rotate([rotate[0], -rotate[1], 0]);

        // Update all paths based on new projection
        svg.selectAll("path").attr("d", path);

        // Update planted area circles
        plantedAreas.each(function(d) {
          // Use projection to update positions
          const coords = projection(d.coordinates);

          // Only show points on the visible side of the globe
          if (coords) {
            d3.select(this)
              .attr("cx", coords[0])
              .attr("cy", coords[1])
              .attr("data-visible", true)
              .attr("opacity", 0.8);
          } else {
            d3.select(this)
              .attr("cx", -1000) // Off-screen
              .attr("cy", -1000)
              .attr("data-visible", false)
              .attr("opacity", 0);
          }
        });
      });

      // Add rotation controls to control layer
      // Speed up button
//      const speedUpBtn = controlLayer.append("g")
//        .attr("class", "control-button")
//        .attr("transform", `translate(${width - 80}, 30)`)
//        .style("cursor", "pointer")
//        .on("click", function() {
//          velocity[0] *= 1.5;
//          velocity[1] *= 1.5;
//        });
//
//      speedUpBtn.append("circle")
//        .attr("r", 15)
//        .attr("fill", "#fff")
//        .attr("stroke", "#333");
//
//      speedUpBtn.append("text")
//        .attr("text-anchor", "middle")
//        .attr("dominant-baseline", "central")
//        .attr("font-size", "14px")
//        .text("⏩");
//
//      // Slow down button
//      const slowDownBtn = controlLayer.append("g")
//        .attr("class", "control-button")
//        .attr("transform", `translate(${width - 40}, 30)`)
//        .style("cursor", "pointer")
//        .on("click", function() {
//          velocity[0] /= 1.5;
//          velocity[1] /= 1.5;
//        });
//
//      slowDownBtn.append("circle")
//        .attr("r", 15)
//        .attr("fill", "#fff")
//        .attr("stroke", "#333");
//
//      slowDownBtn.append("text")
//        .attr("text-anchor", "middle")
//        .attr("dominant-baseline", "central")
//        .attr("font-size", "14px")
//        .text("⏪");

      // Initialize info containers as hidden by default
      hideInfoContainer();

      // Create legend in a separate container
      createGlobeLegend();
    })
    .catch(error => {
      console.error("Error loading world map data:", error);
      // Add error message to the SVG
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "red")
        .text("Error loading world map data. Please try again.");
    });

  return svg.node();
}

// Function to create legend for the globe in a separate container
function createGlobeLegend() {
  const legendContainer = document.getElementById('globe-legend-container');
  if (!legendContainer) return;

  // Clear any existing content
  legendContainer.innerHTML = '';

  // Create completion legend
  const completionLegend = document.createElement('div');
  completionLegend.className = 'legend-section';
  completionLegend.innerHTML = `
    <h6>Project Completion</h6>
    <div class="d-flex justify-content-between">
      ${[25, 50, 75, 100].map(level => `
        <div class="legend-item">
          <div class="color-box" style="background-color: ${d3.interpolateGreens(level/100)}"></div>
          <span>${level}%</span>
        </div>
      `).join('')}
    </div>
  `;

  // Create size legend
  const sizeLegend = document.createElement('div');
  sizeLegend.className = 'legend-section mt-3';
  sizeLegend.innerHTML = `
    <h6>Area Size (hectares)</h6>
    <div class="d-flex justify-content-between">
      ${[100, 500, 1000, 1500].map(size => `
        <div class="legend-item">
          <div class="circle-size" style="width: ${Math.sqrt(size)/10 + 5}px; height: ${Math.sqrt(size)/10 + 5}px"></div>
          <span>${size}</span>
        </div>
      `).join('')}
    </div>
  `;

  // Add legends to container
  legendContainer.appendChild(completionLegend);
  legendContainer.appendChild(sizeLegend);
}

// Function to update the info area below the map with current hovered area details
function updateAreaInfo(area) {
  const infoContainer = document.getElementById('globe-info-container');
  if (!infoContainer) return;

  // Make the container visible when area info is shown
  infoContainer.classList.add('visible');

  infoContainer.innerHTML = `
    <div class="current-area-info">
      <h5>${area.name}</h5>
      <div class="d-flex justify-content-between align-items-center">
        <span class="badge bg-success">${area.completion}% Complete</span>
        <span class="text-muted small">Started: ${new Date(area.details.start_date).toLocaleDateString()}</span>
      </div>
      <div class="progress mt-2 mb-2" style="height: 8px;">
        <div class="progress-bar bg-success" role="progressbar"
          style="width: ${area.completion}%;" aria-valuenow="${area.completion}"
          aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <p class="mb-0"><strong>Trees Planted:</strong> ${area.trees_planted.toLocaleString()}</p>
    </div>
  `;

  // Hide info container when mouse leaves the area
  setTimeout(() => {
    document.addEventListener('mousemove', checkIfOutsideGlobe);
  }, 100);

  function checkIfOutsideGlobe(e) {
    const globeEl = document.querySelector('.globe-visualization');
    if (!globeEl) return;

    const globeRect = globeEl.getBoundingClientRect();
    const isOutsideGlobe = e.clientX < globeRect.left ||
                           e.clientX > globeRect.right ||
                           e.clientY < globeRect.top ||
                           e.clientY > globeRect.bottom;

    if (isOutsideGlobe && !document.querySelector('.planted-area:hover')) {
      hideInfoContainer();
      document.removeEventListener('mousemove', checkIfOutsideGlobe);
    }
  }
}

// Function to hide the info container
function hideInfoContainer() {
  const infoContainer = document.getElementById('globe-info-container');
  if (infoContainer) {
    infoContainer.classList.remove('visible');
  }
}

// Function to show detailed information in the details container
function showAreaDetails(area) {
  const detailsContainer = document.getElementById('globe-details-container');
  if (!detailsContainer) return;

  // First make the hover info container visible
  updateAreaInfo(area);

  detailsContainer.innerHTML = `
    <div class="area-details card">
      <div class="card-header bg-success text-white">
        <h5 class="mb-0">${area.name} Details</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <p><strong>Trees Planted:</strong> ${area.trees_planted.toLocaleString()}</p>
            <p><strong>Area:</strong> ${area.area_hectares.toLocaleString()} hectares</p>
            <p><strong>Completion:</strong> ${area.completion}%</p>
          </div>
          <div class="col-md-6">
            <p><strong>Team Lead:</strong> ${area.details.team_lead}</p>
            <p><strong>Native Species:</strong> ${area.details.native_species}</p>
            <p><strong>Started:</strong> ${new Date(area.details.start_date).toLocaleDateString()}</p>
          </div>
        </div>
        <p class="mt-2">${area.description}</p>
      </div>
    </div>
  `;

  // Add a close button to the details container
  const closeButton = document.createElement('button');
  closeButton.classList.add('btn', 'btn-sm', 'btn-outline-secondary', 'mt-2');
  closeButton.innerHTML = 'Close Details';
  closeButton.addEventListener('click', () => {
    detailsContainer.innerHTML = '';
    hideInfoContainer();
  });

  detailsContainer.appendChild(closeButton);
}


function createMoscowRegionMap() {
  // Moscow region tree planting data
  const moscowData = [
    { id: "central", value: 835, employees: 42, startYear: 2020 },
    { id: "northern", value: 1240, employees: 68, startYear: 2019 },
    { id: "eastern", value: 320, employees: 15, startYear: 2021 },
    { id: "southern", value: 580, employees: 27, startYear: 2022 },
    { id: "western", value: 1497, employees: 73, startYear: 2018 },
    { id: "northwestern", value: 952, employees: 54, startYear: 2019 },
    { id: "northeastern", value: 680, employees: 35, startYear: 2020 },
    { id: "southwestern", value: 780, employees: 38, startYear: 2019 },
    { id: "southeastern", value: 470, employees: 22, startYear: 2021 },
    { id: "zelenograd", value: 350, employees: 18, startYear: 2022 },
    { id: "troitsky", value: 1100, employees: 55, startYear: 2018 },
    { id: "novomoskovsky", value: 890, employees: 44, startYear: 2019 },
    { id: "eastern_outskirts", value: 425, employees: 21, startYear: 2021 },
    { id: "northern_outskirts", value: 785, employees: 39, startYear: 2020 },
    { id: "southern_outskirts", value: 650, employees: 32, startYear: 2021 },
    { id: "western_outskirts", value: 910, employees: 45, startYear: 2019 }
  ];

  // Moscow cities/towns data with corrected coordinates aligned with district shapes
  const moscowCities = [
    { name: "Moscow City Center", x: 350, y: 250, size: 12, importance: "capital" },
    { name: "Zelenograd", x: 200, y: 100, size: 8, importance: "major" },
    { name: "Khimki", x: 280, y: 140, size: 7, importance: "major" },
    { name: "Mytishchi", x: 410, y: 160, size: 7, importance: "major" },
    { name: "Balashikha", x: 460, y: 230, size: 7, importance: "major" },
    { name: "Lyubertsy", x: 440, y: 290, size: 7, importance: "major" },
    { name: "Podolsk", x: 350, y: 370, size: 7, importance: "major" },
    { name: "Krasnogorsk", x: 260, y: 190, size: 6, importance: "minor" },
    { name: "Odintsovo", x: 225, y: 240, size: 6, importance: "minor" },
    { name: "Troitsk", x: 240, y: 410, size: 6, importance: "minor" },
    { name: "Domodedovo", x: 390, y: 370, size: 6, importance: "minor" },
    { name: "Reutov", x: 455, y: 255, size: 5, importance: "minor" },
    { name: "Dolgoprudny", x: 320, y: 130, size: 5, importance: "minor" },
    { name: "Lobnya", x: 350, y: 110, size: 5, importance: "minor" }
  ];

  // Road connections between cities
  const moscowRoads = [
    // Main highways
    { from: "Moscow City Center", to: "Khimki", type: "highway", width: 3 },
    { from: "Moscow City Center", to: "Mytishchi", type: "highway", width: 3 },
    { from: "Moscow City Center", to: "Balashikha", type: "highway", width: 3 },
    { from: "Moscow City Center", to: "Lyubertsy", type: "highway", width: 3 },
    { from: "Moscow City Center", to: "Podolsk", type: "highway", width: 3 },
    { from: "Moscow City Center", to: "Odintsovo", type: "highway", width: 3 },
    { from: "Moscow City Center", to: "Krasnogorsk", type: "highway", width: 3 },

    // Secondary roads
    { from: "Khimki", to: "Zelenograd", type: "secondary", width: 2 },
    { from: "Khimki", to: "Dolgoprudny", type: "secondary", width: 2 },
    { from: "Dolgoprudny", to: "Lobnya", type: "secondary", width: 2 },
    { from: "Dolgoprudny", to: "Mytishchi", type: "secondary", width: 2 },
    { from: "Balashikha", to: "Reutov", type: "secondary", width: 2 },
    { from: "Reutov", to: "Lyubertsy", type: "secondary", width: 2 },
    { from: "Podolsk", to: "Domodedovo", type: "secondary", width: 2 },
    { from: "Podolsk", to: "Troitsk", type: "secondary", width: 2 }
  ];

  // Set up dimensions
  const width = 700;
  const height = 550;
  const margin = { top: 40, right: 20, bottom: 40, left: 20 };

  // Create SVG with increased dimensions for European Russia
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;")
    .attr("class", "choropleth-map");

  // Create tooltip
  const tooltip = d3.select("#map-tooltip");

  // Create color scale for choropleth
  const colorScale = d3.scaleQuantize()
    .domain([0, 1500])
    .range(d3.schemeGreens[9]);

  // European Russia regions outline
  const russiaOuterBorder = {
    type: "Polygon",
    coordinates: [[
      [50, 50], [150, 20], [300, 10], [450, 30], [550, 70],
      [600, 150], [620, 250], [580, 350], [500, 450], [400, 500],
      [300, 520], [150, 500], [80, 450], [50, 350], [30, 250], [50, 50]
    ]]
  };

  // Create groups for different layers to control rendering order
  const baseMapGroup = svg.append("g").attr("class", "base-map-group");
  const districtsGroup = svg.append("g").attr("class", "districts-group");
  const roadsGroup = svg.append("g").attr("class", "roads-group");
  const citiesGroup = svg.append("g").attr("class", "cities-group");
  const labelsGroup = svg.append("g").attr("class", "labels-group");

  // Draw European Russia outline
  baseMapGroup.append("path")
    .datum(russiaOuterBorder)
    .attr("d", d3.geoPath())
    .attr("fill", "#f0f0f0")
    .attr("stroke", "#444")
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.5)
    .attr("class", "russia-border");

  // More detailed GeoJSON for Moscow regions with complete coverage and corrected coordinates
  const moscowGeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        id: "central",
        properties: { name: "Central Administrative District", plantDensity: 85 },
        geometry: { type: "Polygon", coordinates: [[
          [330, 250], [350, 220], [380, 250], [350, 280], [330, 250]
        ]]}
      },
      {
        type: "Feature",
        id: "northern",
        properties: { name: "Northern Administrative District", plantDensity: 68 },
        geometry: { type: "Polygon", coordinates: [[
          [330, 170], [370, 140], [410, 120], [450, 150], [400, 200], [350, 200], [330, 170]
        ]]}
      },
      {
        type: "Feature",
        id: "northeastern",
        properties: { name: "Northeastern Administrative District", plantDensity: 72 },
        geometry: { type: "Polygon", coordinates: [[
          [370, 140], [410, 120], [480, 130], [450, 180], [400, 200], [370, 140]
        ]]}
      },
      {
        type: "Feature",
        id: "eastern",
        properties: { name: "Eastern Administrative District", plantDensity: 42 },
        geometry: { type: "Polygon", coordinates: [[
          [400, 200], [450, 180], [500, 185], [510, 230], [470, 260], [425, 240], [400, 200]
        ]]}
      },
      {
        type: "Feature",
        id: "southeastern",
        properties: { name: "Southeastern Administrative District", plantDensity: 59 },
        geometry: { type: "Polygon", coordinates: [[
          [425, 240], [470, 260], [480, 310], [430, 330], [390, 300], [425, 240]
        ]]}
      },
      {
        type: "Feature",
        id: "southern",
        properties: { name: "Southern Administrative District", plantDensity: 53 },
        geometry: { type: "Polygon", coordinates: [[
          [350, 280], [425, 240], [390, 300], [345, 330], [320, 300], [350, 280]
        ]]}
      },
      {
        type: "Feature",
        id: "southwestern",
        properties: { name: "Southwestern Administrative District", plantDensity: 64 },
        geometry: { type: "Polygon", coordinates: [[
          [320, 300], [345, 330], [320, 370], [260, 350], [280, 310], [320, 300]
        ]]}
      },
      {
        type: "Feature",
        id: "western",
        properties: { name: "Western Administrative District", plantDensity: 76 },
        geometry: { type: "Polygon", coordinates: [[
          [230, 210], [330, 170], [350, 200], [330, 250], [280, 310], [240, 275], [230, 210]
        ]]}
      },
      {
        type: "Feature",
        id: "northwestern",
        properties: { name: "Northwestern Administrative District", plantDensity: 71 },
        geometry: { type: "Polygon", coordinates: [[
          [230, 160], [290, 120], [330, 170], [230, 210], [210, 185], [230, 160]
        ]]}
      },
      {
        type: "Feature",
        id: "zelenograd",
        properties: { name: "Zelenograd Administrative District", plantDensity: 56 },
        geometry: { type: "Polygon", coordinates: [[
          [180, 90], [220, 80], [225, 120], [185, 130], [180, 90]
        ]]}
      },
      {
        type: "Feature",
        id: "troitsky",
        properties: { name: "Troitsky Administrative District", plantDensity: 88 },
        geometry: { type: "Polygon", coordinates: [[
          [210, 400], [280, 390], [275, 450], [185, 440], [210, 400]
        ]]}
      },
      {
        type: "Feature",
        id: "novomoskovsky",
        properties: { name: "Novomoskovsky Administrative District", plantDensity: 79 },
        geometry: { type: "Polygon", coordinates: [[
          [280, 390], [360, 400], [350, 450], [275, 450], [280, 390]
        ]]}
      },
      // Additional regions to fill white spaces with improved coordinates
      {
        type: "Feature",
        id: "eastern_outskirts",
        properties: { name: "Eastern Outskirts", plantDensity: 42 },
        geometry: { type: "Polygon", coordinates: [[
          [510, 230], [540, 200], [550, 280], [480, 310], [470, 260], [510, 230]
        ]]}
      },
      {
        type: "Feature",
        id: "northern_outskirts",
        properties: { name: "Northern Outskirts", plantDensity: 66 },
        geometry: { type: "Polygon", coordinates: [[
          [450, 150], [480, 130], [540, 110], [540, 200], [500, 185], [450, 180], [450, 150]
        ]]}
      },
      {
        type: "Feature",
        id: "southern_outskirts",
        properties: { name: "Southern Outskirts", plantDensity: 45 },
        geometry: { type: "Polygon", coordinates: [[
          [430, 330], [480, 310], [550, 280], [540, 400], [430, 435], [350, 450], [360, 400], [430, 330]
        ]]}
      },
      {
        type: "Feature",
        id: "western_outskirts",
        properties: { name: "Western Outskirts", plantDensity: 62 },
        geometry: { type: "Polygon", coordinates: [[
          [160, 160], [230, 160], [210, 185], [230, 210], [240, 275], [185, 340], [160, 260], [160, 160]
        ]]}
      }
    ]
  };

  // Create Moscow outer border with more detail
  const moscowOuterBorder = {
    type: "Polygon",
    coordinates: [[
      [290, 210], [330, 190], [380, 185], [420, 200], [450, 225],
      [460, 250], [460, 280], [450, 310], [430, 335], [390, 355],
      [350, 360], [310, 350], [290, 330], [280, 290], [290, 210]
    ]]
  };

  // Draw outer border as background
  baseMapGroup.append("path")
    .datum(moscowOuterBorder)
    .attr("d", d3.geoPath())
    .attr("fill", "#f8f9fa")
    .attr("stroke", "#000")
    .attr("stroke-width", 2)
    .attr("class", "city-border");

  // Add label for Moscow region
  labelsGroup.append("text")
    .attr("x", 370)
    .attr("y", 175)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("font-weight", "bold")
    .attr("fill", "#333")
    .text("Moscow Region");

  // Draw each district first (so they appear below roads and cities)
  districtsGroup.selectAll(".district")
    .data(moscowGeoJSON.features)
    .join("path")
    .attr("class", "district")
    .attr("d", d3.geoPath())
    .attr("fill", d => {
      const dataObj = moscowData.find(item => item.id === d.id);
      return dataObj ? colorScale(dataObj.value) : "#ccc";
    })
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.8)
    .on("mouseover", function(event, d) {
      // Highlight district on hover
      d3.select(this)
        .attr("stroke", "#333")
        .attr("stroke-width", 2.5);

      // Show tooltip
      const dataObj = moscowData.find(item => item.id === d.id);
      if (dataObj) {
        const progress = Math.round((dataObj.value / 1500) * 100);
        const plantDensity = d.properties.plantDensity || Math.round(dataObj.value / 20);
        tooltip
          .classed("visible", true)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px")
          .html(`
            <div class="tooltip-header">
              <h5>${d.properties.name}</h5>
              <span class="badge bg-success">${plantDensity}% Forest Coverage</span>
            </div>
            <div class="tooltip-body">
              <p><strong>Trees Planted:</strong> ${dataObj.value} of 1500</p>
              <div class="progress" style="height: 8px; margin-bottom: 10px;">
                <div class="progress-bar bg-success" role="progressbar"
                    style="width: ${progress}%;" aria-valuenow="${progress}"
                    aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <p><strong>Employees Involved:</strong> ${dataObj.employees}</p>
              <p><strong>Project Start:</strong> ${dataObj.startYear}</p>
              <p><strong>Native Plants:</strong> ${Math.round(dataObj.value * 0.7)} species</p>
            </div>
          `);
      }
    })
    .on("mouseout", function() {
      // Reset styling
      d3.select(this)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5);

      // Hide tooltip
      tooltip.classed("visible", false);
    });

  // Draw roads after districts so they appear above the green areas
  roadsGroup.selectAll("line")
    .data(moscowRoads)
    .join("line")
    .attr("class", "road")
    .attr("x1", d => {
      const fromCity = moscowCities.find(city => city.name === d.from);
      return fromCity ? fromCity.x : 0;
    })
    .attr("y1", d => {
      const fromCity = moscowCities.find(city => city.name === d.from);
      return fromCity ? fromCity.y : 0;
    })
    .attr("x2", d => {
      const toCity = moscowCities.find(city => city.name === d.to);
      return toCity ? toCity.x : 0;
    })
    .attr("y2", d => {
      const toCity = moscowCities.find(city => city.name === d.to);
      return toCity ? toCity.y : 0;
    })
    .attr("stroke", "#f4d03f") // Yellow color for all roads
    .attr("stroke-width", d => d.width)
    .attr("stroke-opacity", 0.8)
    .attr("stroke-linecap", "round")
    .attr("stroke-dasharray", "2,4") // Chain of dots pattern for all roads
    .attr("stroke-dashoffset", (d, i) => i * 2); // Offset for visual variety

  // Add district labels with better positioning
  labelsGroup.selectAll(".district-label")
    .data(moscowGeoJSON.features)
    .join("text")
    .attr("class", "district-label")
    .attr("transform", d => {
      // Find centroid of each district
      const polygon = d.geometry.coordinates[0];
      const xSum = polygon.reduce((sum, point) => sum + point[0], 0);
      const ySum = polygon.reduce((sum, point) => sum + point[1], 0);
      const centroidX = xSum / polygon.length;
      const centroidY = ySum / polygon.length;
      return `translate(${centroidX}, ${centroidY})`;
    })
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("fill", "#333")
    .attr("font-size", "10px")
    .attr("font-weight", "bold")
    .attr("pointer-events", "none")
    .text(d => d.id.substring(0, 3).toUpperCase());

  // We're already using the citiesGroup created earlier

  // Add city markers with plant icons
  citiesGroup.selectAll(".city-circle")
    .data(moscowCities)
    .join("g")
    .attr("class", "city-marker")
    .attr("transform", d => `translate(${d.x}, ${d.y})`)
    .each(function(d) {
      // Add circle background
      d3.select(this)
        .append("circle")
        .attr("class", "city-circle")
        .attr("r", d.size)
        .attr("fill", d => d.importance === "capital" ? "#d32f2f" :
                         d.importance === "major" ? "#f57c00" : "#7cb342")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .attr("opacity", 0.85);

      // Add plant icon
      d3.select(this)
        .append("text")
        .attr("class", "plant-icon")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("fill", "#fff")
        .attr("font-size", d => d.size * 1.2)
        .attr("pointer-events", "none")
        .text(d => d.importance === "capital" ? "🌳" :
                   d.importance === "major" ? "🌲" : "🌱");
    })
    .on("mouseover", function(event, d) {
      // Highlight city on hover
      d3.select(this)
        .attr("stroke", "#333")
        .attr("r", d.size * 1.3)
        .attr("opacity", 1);

      // Show tooltip
      tooltip
        .classed("visible", true)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px")
        .html(`
          <div class="tooltip-header">
            <h5>${d.name}</h5>
          </div>
          <div class="tooltip-body">
            <p><strong>Status:</strong> ${d.importance === "capital" ? "Capital" :
                                          d.importance === "major" ? "Major City" : "Town"}</p>
            <p><strong>Location:</strong> Moscow Region</p>
          </div>
        `);
    })
    .on("mouseout", function(event, d) {
      // Reset styling
      d3.select(this)
        .attr("stroke", "#fff")
        .attr("r", d.size)
        .attr("opacity", 0.85);

      // Hide tooltip
      tooltip.classed("visible", false);
    });

  // City labels with shadow for better visibility without backgrounds
  labelsGroup.selectAll(".city-label")
    .data(moscowCities)
    .join("text")
    .attr("class", "city-label")
    .attr("x", d => d.x)
    .attr("y", d => d.y + d.size + 10)
    .attr("text-anchor", "middle")
    .attr("font-size", d => d.importance === "capital" ? "11px" : "9px")
    .attr("font-weight", d => d.importance === "capital" ? "bold" : "normal")
    .attr("fill", d => d.importance === "capital" ? "#900" : "#333")
    .attr("stroke", "none")
    .attr("filter", "drop-shadow(0px 1px 2px rgba(255,255,255,0.8))")
    .attr("pointer-events", "none")
    .text(d => d.name.length > 10 ? d.name.split(' ')[0] : d.name);

  // Add title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .text("European Russia Tree Planting Initiative");

  // Add major Russian cities in European Russia
  const russianCities = [
    { name: "Moscow", x: 370, y: 250, size: 12, importance: "capital" },
    { name: "St. Petersburg", x: 300, y: 120, size: 10, importance: "major" },
    { name: "Nizhny Novgorod", x: 440, y: 230, size: 8, importance: "major" },
    { name: "Kazan", x: 480, y: 280, size: 8, importance: "major" },
    { name: "Rostov-on-Don", x: 370, y: 400, size: 8, importance: "major" },
    { name: "Voronezh", x: 400, y: 330, size: 7, importance: "major" },
    { name: "Sochi", x: 350, y: 470, size: 7, importance: "minor" },
    { name: "Volgograd", x: 450, y: 370, size: 7, importance: "major" },
    { name: "Kaliningrad", x: 150, y: 120, size: 6, importance: "minor" },
    { name: "Murmansk", x: 250, y: 50, size: 6, importance: "minor" }
  ];

  // Draw major Russian cities
  citiesGroup.selectAll(".russian-city")
    .data(russianCities)
    .join("circle")
    .attr("class", "russian-city")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.size)
    .attr("fill", d => d.importance === "capital" ? "#d32f2f" :
                      d.importance === "major" ? "#f57c00" : "#7cb342")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .attr("opacity", 0.85);

  // Add city labels
  labelsGroup.selectAll(".russian-city-label")
    .data(russianCities)
    .join("text")
    .attr("class", "russian-city-label")
    .attr("x", d => d.x)
    .attr("y", d => d.y + d.size + 10)
    .attr("text-anchor", "middle")
    .attr("font-size", d => d.importance === "capital" ? "12px" : "10px")
    .attr("font-weight", d => d.importance === "capital" ? "bold" : "normal")
    .attr("fill", "#333")
    .attr("filter", "drop-shadow(0px 1px 1px rgba(255,255,255,0.8))")
    .text(d => d.name);

  // Add major rivers of European Russia
  const russianRivers = [
    // Volga River
    { points: [[480, 100], [470, 170], [450, 220], [470, 280], [450, 350], [430, 420]], name: "Volga" },
    // Don River
    { points: [[380, 300], [400, 350], [370, 400]], name: "Don" },
    // Dnieper River
    { points: [[220, 180], [250, 240], [240, 290], [250, 350]], name: "Dnieper" },
    // Neva River
    { points: [[280, 110], [300, 120]], name: "Neva" }
  ];

  // Create a rivers group between base map and districts
  const riversGroup = svg.insert("g", ".districts-group")
    .attr("class", "rivers-group");

  // Draw rivers
  russianRivers.forEach(river => {
    riversGroup.append("path")
      .attr("d", d3.line()(river.points))
      .attr("fill", "none")
      .attr("stroke", "#66a4ff")
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.6)
      .attr("class", "river-path");

    // Add river label at the middle point
    const midPointIndex = Math.floor(river.points.length / 2);
    const midPoint = river.points[midPointIndex];

    labelsGroup.append("text")
      .attr("x", midPoint[0] + 10)
      .attr("y", midPoint[1])
      .attr("font-size", "10px")
      .attr("fill", "#3388cc")
      .attr("filter", "drop-shadow(0px 1px 1px rgba(255,255,255,0.8))")
      .text(river.name);
  });

  // Add legend for districts
  const legendWidth = 260;
  const legendHeight = 15;
  const legendX = width - 280;
  const legendY = height - 80;

  // Create gradient for legend
  const defs = svg.append("defs");
  const linearGradient = defs.append("linearGradient")
    .attr("id", "green-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

  // Add color stops
  d3.schemeGreens[9].forEach((color, i) => {
    linearGradient.append("stop")
      .attr("offset", `${(i / (d3.schemeGreens[9].length - 1)) * 100}%`)
      .attr("stop-color", color);
  });

  // Add legend rectangle
  svg.append("rect")
    .attr("x", legendX)
    .attr("y", legendY)
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .attr("fill", "url(#green-gradient)")
    .attr("rx", 3);

  // Add legend ticks and labels
  const legendScale = d3.scaleLinear()
    .domain([0, 1500])
    .range([0, legendWidth]);

  const legendAxis = d3.axisBottom(legendScale)
    .tickSize(13)
    .tickValues([0, 300, 600, 900, 1200, 1500]);

  svg.append("g")
    .attr("transform", `translate(${legendX}, ${legendY + legendHeight})`)
    .call(legendAxis)
    .select(".domain")
    .remove();

  // Add legend title
  svg.append("text")
    .attr("x", legendX)
    .attr("y", legendY - 10)
    .attr("text-anchor", "start")
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .text("Trees Planted:");

  // Add city type legend
  const cityLegendY = height - 30;

  // City legend circles
  svg.append("circle")
    .attr("cx", legendX)
    .attr("cy", cityLegendY)
    .attr("r", 6)
    .attr("fill", "#d32f2f")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1);

  svg.append("text")
    .attr("x", legendX + 10)
    .attr("y", cityLegendY + 4)
    .attr("font-size", "10px")
    .text("Capital");

  svg.append("circle")
    .attr("cx", legendX + 60)
    .attr("cy", cityLegendY)
    .attr("r", 5)
    .attr("fill", "#f57c00")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1);

  svg.append("text")
    .attr("x", legendX + 70)
    .attr("y", cityLegendY + 4)
    .attr("font-size", "10px")
    .text("Major City");

  svg.append("circle")
    .attr("cx", legendX + 140)
    .attr("cy", cityLegendY)
    .attr("r", 4)
    .attr("fill", "#7cb342")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1);

  svg.append("text")
    .attr("x", legendX + 150)
    .attr("y", cityLegendY + 4)
    .attr("font-size", "10px")
    .text("Town");

  // Road legend
  const roadLegendY = cityLegendY + 20;

  // Highway
  svg.append("line")
    .attr("x1", legendX)
    .attr("y1", roadLegendY)
    .attr("x2", legendX + 30)
    .attr("y2", roadLegendY)
    .attr("stroke", "#f4d03f")
    .attr("stroke-width", 3)
    .attr("stroke-opacity", 0.8)
    .attr("stroke-dasharray", "2,4");

  svg.append("text")
    .attr("x", legendX + 35)
    .attr("y", roadLegendY + 4)
    .attr("font-size", "10px")
    .text("Highway");

  // Secondary road
  svg.append("line")
    .attr("x1", legendX + 100)
    .attr("y1", roadLegendY)
    .attr("x2", legendX + 130)
    .attr("y2", roadLegendY)
    .attr("stroke", "#f4d03f")
    .attr("stroke-width", 2)
    .attr("stroke-opacity", 0.8)
    .attr("stroke-dasharray", "2,4");

  svg.append("text")
    .attr("x", legendX + 135)
    .attr("y", roadLegendY + 4)
    .attr("font-size", "10px")
    .text("Secondary Road");

  return svg.node();
}

// Function to show loading spinner
function showMapLoading(containerId) {
    const container = document.getElementById(containerId) || document.querySelector(containerId);
    if (container) {
        container.innerHTML = `
            <div class="d-flex justify-content-center align-items-center" style="height: 400px;">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <span class="ms-2">Loading map data...</span>
            </div>
        `;
    }
}

// Add this helper function to ensure tooltips work correctly with D3
function initializeTooltipContainer() {
    // Make sure tooltip container is properly initialized
    const tooltip = d3.select("#map-tooltip");
    if (tooltip.empty()) {
        d3.select("body").append("div")
            .attr("id", "map-tooltip")
            .attr("class", "map-tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("pointer-events", "none")
            .style("background", "white")
            .style("border", "1px solid #ddd")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("box-shadow", "0 0 10px rgba(0,0,0,0.1)")
            .style("z-index", "1000")
            .style("max-width", "300px");
    }
}

// Function to directly append the D3 visualization to DOM
function renderD3Map() {
    if (document.getElementById('moscow-map')) {
        // Clear any existing content
        document.getElementById('moscow-map').innerHTML = '';

        // Show loading indicator while rendering
        document.getElementById('moscow-map').innerHTML = `
            <div class="d-flex justify-content-center align-items-center" style="height: 200px;">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Rendering globe...</span>
                </div>
                <span class="ms-2">Rendering global planting visualization...</span>
            </div>
        `;

        // Create the D3 visualization and append it to the container immediately
        try {
            // Clear container again before appending map
            setTimeout(() => {
                document.getElementById('moscow-map').innerHTML = '';

                // Create orthographic globe with proper element order
                const globeVisualization = createOrthographicGlobe();
                if (globeVisualization) {
                    document.getElementById('moscow-map').appendChild(globeVisualization);

                    // Add plant-related overlays and information
                    addPlantOverlays('moscow-map');

                    // Make sure tooltip container exists
                    if (!document.getElementById('map-tooltip')) {
                        const tooltipDiv = document.createElement('div');
                        tooltipDiv.id = 'map-tooltip';
                        tooltipDiv.className = 'map-tooltip';
                        document.body.appendChild(tooltipDiv);
                    }

                    // Force browser repaint by adding a small class change
                    const mapContainer = document.getElementById('moscow-map');
                    mapContainer.classList.add('rendered');

                    // Ensure map is visible with proper opacity
                    const svgEl = mapContainer.querySelector('svg');
                    if (svgEl) {
                        svgEl.style.opacity = 1;

                        // Ensure elements have proper z-index
//                        const clickableElements = svgEl.querySelectorAll('.planted-area, .control-button');
                        const clickableElements = svgEl.querySelectorAll('.planted-area');
                        clickableElements.forEach(element => {
                            element.style.pointerEvents = 'all';
                        });
                    }

                    console.log('Map rendering complete');
                } else {
                    console.error('Failed to create the orthographic globe');
                    document.getElementById('moscow-map').innerHTML = `
                        <div class="alert alert-warning">
                            <i class="bi bi-exclamation-triangle me-2"></i>
                            Failed to load the globe visualization. Please refresh the page.
                        </div>
                    `;
                }
            }, 100);
        } catch (error) {
            console.error('Error rendering D3 map:', error);
            document.getElementById('moscow-map').innerHTML = `
                <div class="alert alert-warning">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    An error occurred while loading the globe. Please refresh the page.
                </div>
            `;
        }
    }
}

// Function to add plant-related overlays to the map
function addPlantOverlays(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // We no longer add the plant distribution legend here
    // as it's now a separate section in the HTML
}

// Function to handle responsive map rendering
function handleResponsiveMap() {
    let resizeTimer;
    window.addEventListener('resize', () => {
        // Debounce resize events
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const mapContainer = document.getElementById('moscow-map');
            const currentWidth = mapContainer?.clientWidth || 0;

            // Store width in data attribute to detect actual size changes
            const previousWidth = mapContainer?.getAttribute('data-previous-width') || 0;

            // Only re-render if width changed significantly
            if (Math.abs(currentWidth - previousWidth) > 50) {
                renderD3Map();
                mapContainer.setAttribute('data-previous-width', currentWidth.toString());
            }
        }, 250);
    });
}

// Load maps when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize bootstrap tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        if (tooltipTriggerList.length > 0 && typeof bootstrap !== 'undefined') {
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }

        // Setup responsive map rendering
        handleResponsiveMap();

        // Make sure tooltip container exists for D3 maps
        initializeTooltipContainer();

        // Function to show iframe after loading
        function handleIframeLoading(iframeId, containerId) {
            const iframe = document.getElementById(iframeId);
            const container = document.getElementById(containerId);

            if (!iframe || !container) return;

            // Set loading timeout - if iframe doesn't load in 5 seconds, show it anyway
            const loadingTimeout = setTimeout(() => {
                container.classList.remove('loading');
                iframe.style.display = 'block';
                console.log(`${iframeId} loaded (timeout)`);
            }, 5000);

            // Add load event listener to iframe
            iframe.addEventListener('load', function() {
                clearTimeout(loadingTimeout);
                container.classList.remove('loading');
                iframe.style.display = 'block';
                console.log(`${iframeId} loaded successfully`);
            });

            // Handle error case
            iframe.addEventListener('error', function(error) {
                clearTimeout(loadingTimeout);
                console.error(`Error loading ${iframeId}:`, error);
                container.classList.remove('loading');
                container.innerHTML = `
                    <div class="alert alert-warning m-3">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        Error loading map. Please try refreshing the page.
                    </div>
                `;
            });
        }

        // Load first Yandex Map (Moscow locations)
        if (document.getElementById('yandex-map-container')) {
            console.log("Loading Moscow locations map...");
            handleIframeLoading('yandex-map-frame', 'yandex-map-container');
        }

        // Initialize D3.js Orthographic Globe - with retry mechanism
        if (document.getElementById('moscow-map')) {
            console.log("Loading D3.js rotating globe...");
            // First attempt to render the D3 map
            renderD3Map();

            // If it doesn't appear, try again after a short delay
            setTimeout(() => {
                const mapSvg = document.querySelector("#moscow-map svg");
                if (!mapSvg || mapSvg.getBoundingClientRect().height < 10) {
                    console.log("Retrying globe rendering...");
                    renderD3Map();
                }
            }, 500);
        }

        // If we need to load the D3.js visualization components for other parts of the page
        if (document.querySelector('.density-chart')) {
            console.log("Initializing density charts...");
            // Animation for density charts
            const densityFills = document.querySelectorAll('.density-fill');
            densityFills.forEach((fill, index) => {
                setTimeout(() => {
                    fill.style.width = fill.style.width;
                }, index * 200);
            });
        }

    } catch (error) {
        console.error("Error initializing maps:", error);
        // Show error message in map containers
        const containers = [
            document.getElementById('yandex-map-container'),
            document.getElementById('moscow-map')
        ];

        containers.forEach(container => {
            if (container) {
                container.innerHTML = `
                    <div class="alert alert-warning m-3">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        Could not load map data. Please try refreshing the page.
                    </div>
                `;
            }
        });
    }
});
