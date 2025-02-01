uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;
varying vec3 vNormal;
varying vec2 vUv;

void main() {

  float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
  // elevation = vElevation;

  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

  vec2 center = vec2(0.5, 0.5); // center of the plane
  float radius = 0.48; // radius of the circle
  float dist = distance(vUv, center);
    
    if (dist < radius) {
      gl_FragColor = vec4(color, 1.0); // Inside the circle
    } else {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); // Outside the circle, make transparent
    }

  // gl_FragColor = vec4(color, 1.0);

  #include <colorspace_fragment>
}