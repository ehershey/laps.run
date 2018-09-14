function toYaml (opts={}) {
  const title = opts.title
  if (title == undefined) return new Error('title is a required input')
  let googleMapUrl = opts.googleMapUrl
  if (googleMapUrl == undefined) return new Error('googleMapUrl is a required input')

  let diameter = opts.diameter
  if (diameter == undefined) return new Error('diameter is a required input')

  // https://github.com/isaacs/core-util-is/blob/master/lib/util.js#L53
  if (typeof diameter === 'string') {
    console.log(`diameter passed as string, converting to float: ${diameter}`)
    try {
      diameter = parseFloat(diameter)
    } catch (e) {
      console.error('failed to convert diameter to float')
      return e
    }
    console.log(`diameter converted to float: ${diameter}`)
  }

  let distance = opts.distance
  if (distance == undefined) {
    console.log('no input for "distance", using default "400m"')
    distance = 400
  }

  if (typeof distance === 'string') {
    console.log(`distance passed as string: ${distance}, converting to float`)
    try {
      distance = parseFloat(distance)
    } catch (e) {
      console.error('failed to convert distance to float')
      return e
    }
    console.log(`distance converted to float: ${distance}`)
  }

  let shoulder = opts.shoulder
  if (shoulder == undefined) return new Error('shoulder is a required input')
  if (typeof shoulder === 'string') {
    console.log(`shoulder passed as string: ${shoulder} , converting to float`)
    try {
      shoulder = parseFloat(shoulder)
    } catch (e) {
      console.error('failed to convert shoulder to float')
      return e
    }
    console.log(`shoulder converted to float: ${shoulder}`)
  }


  let latitude = googleMapUrl.split('/')[4].split(',')[0]
  latitude = latitude.replace('@', '')

  let longitude = googleMapUrl.split('/')[4].split(',')[1]

  let a = diameter / 2
  let c = shoulder - diameter
  let b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2))
  let ab = (1 - a/b) * 100
  let speed = Math.PI * diameter - (distance / 2)

  return `---
title: "${title}"
date: ${(new Date).toISOString()}
tags: []
latitude: ${latitude}
longitude: ${longitude}
elevation_meters: ${opts.elevation}
distance_meters: ${distance}
lap_lanes: ${opts.lapLanes}
home_lanes: ${opts.homeLanes}
surface_type: ${opts.surfaceType}
surface_color: ${opts.surfaceColor}
turn_diameter_meters: ${round(diameter, 2)}
turn_radius_b_meters: ${round(b, 2)}
speed_rating: ${round(speed, 2)}
steeple_water_location: ${opts.steepleLocation}
---

<!--more-->`
}
