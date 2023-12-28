function lerp(A, B, t) {
  return A + (B - A) * t
}

function getIntersection(A, B, C, D) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y)
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)

  if(bottom!=0) {
    const t = tTop / bottom
    const u = uTop / bottom
    if((t >= 0 && t <= 1) && (u >= 0 && u <= 1)) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t
      }
    }
  }
  return null
}

function polysIntersect(poly1, poly2) {
  for(let i = 0; i < poly1.length; i++) {
    for(let j = 0; j < poly2.length; j++) {
      A = poly1[i]
      B = poly1[(i + 1) % poly1.length]
      C = poly2[j]
      D = poly2[(j+1) % poly2.length]
      if(getIntersection(A, B, C, D)) return true
    }
  }
  return false
}

function getSegments(points) {
  segments = []
  points.forEach((e,i)=>{
    const o = points[(i +1)%points.length]
    segments.push([{e}, {o}])  
  })
  return segments
}