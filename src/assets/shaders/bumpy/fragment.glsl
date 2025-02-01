uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture; // Assuming texture sampler

// Noise and gradient noise functions
vec3 hash(vec3 p) {
    p = vec3(
        dot(p, vec3(127.1, 311.7, 74.7)),
        dot(p, vec3(269.5, 183.3, 246.1)),
        dot(p, vec3(113.5, 271.9, 124.6))
    );

    float a = uTime * 6.0;
    mat2 m = mat2(vec2(cos(a), -sin(a)), vec2(sin(a), cos(a)));
    p = -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    p.xy = m * p.xy;
    return p;
}

vec3 interp(vec3 f) {
    return ((6.0 * f - 15.0) * f + 10.0) * f * f * f;
}

vec3 Dinterp(vec3 f) {
    return ((30.0 * f - 60.0) * f + 30.0) * f * f;
}

float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = interp(f);

    return mix(
        mix(
            mix(dot(hash(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)),
                dot(hash(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
            mix(dot(hash(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)),
                dot(hash(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x), u.y),
        mix(
            mix(dot(hash(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)),
                dot(hash(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
            mix(dot(hash(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)),
                dot(hash(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
}

vec3 GrNoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = interp(f);
    vec3 du = Dinterp(f);

    vec3 h000 = hash(i + vec3(0.0, 0.0, 0.0));
    vec3 h100 = hash(i + vec3(1.0, 0.0, 0.0));
    vec3 h010 = hash(i + vec3(0.0, 1.0, 0.0));
    vec3 h110 = hash(i + vec3(1.0, 1.0, 0.0));
    vec3 h001 = hash(i + vec3(0.0, 0.0, 1.0));
    vec3 h101 = hash(i + vec3(1.0, 0.0, 1.0));
    vec3 h011 = hash(i + vec3(0.0, 1.0, 1.0));
    vec3 h111 = hash(i + vec3(1.0, 1.0, 1.0));

    vec3 v = mix(
        mix(
            mix(h000, h100, u.x),
            mix(h010, h110, u.x), u.y),
        mix(
            mix(h001, h101, u.x),
            mix(h011, h111, u.x), u.y), u.z);

    v.x += mix(
        mix(
            mix(dot(h000, f - vec3(0.0, 0.0, 0.0)), dot(h100, f - vec3(1.0, 0.0, 0.0)), du.x),
            mix(dot(h010, f - vec3(0.0, 1.0, 0.0)), dot(h110, f - vec3(1.0, 1.0, 0.0)), du.x), u.y),
        mix(
            mix(dot(h001, f - vec3(0.0, 0.0, 1.0)), dot(h101, f - vec3(1.0, 0.0, 1.0)), du.x),
            mix(dot(h011, f - vec3(0.0, 1.0, 1.0)), dot(h111, f - vec3(1.0, 1.0, 1.0)), du.x), u.y), u.z);

    return v;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = (-uResolution + 2.0 * gl_FragCoord.xy) / uResolution.y;

    vec3 ro = vec3(2.5 * cos(uTime * 0.05), 1.0, 2.5 * sin(uTime * 0.05));
    vec3 ta = vec3(0.0, 1.0, 0.0);

    vec3 ww = normalize(ta - ro);
    vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
    vec3 vv = normalize(cross(uu, ww));
    vec3 rd = normalize(p.x * uu + p.y * vv + 1.5 * ww);

    float tmin = 10000.0;
    vec3 col = vec3(0.0);

    vec3 sc = vec3(0.0, 1.0, 0.0);
    float h = (0.0 - ro.y) / rd.y;

    if (h > 0.0) {
        tmin = h;
        vec3 pos = ro + h * rd;
        vec3 di = sc - pos;
        float l = length(di);
        float occ = 0.5 * (1.0 - 1.05 * dot(vec3(0.0, 1.0, 0.0), di / l) * 1.0 / (l * l));
        col = occ * texture(uTexture, pos.xy).xyz;
    }

    col = sqrt(2.0 * col);

    // gl_FragColor = vec4(col, 1.0);
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    // gl_FragColor = vec4(uv, 0.0, 1.0);
}
