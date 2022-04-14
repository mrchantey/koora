/* eslint-disable*/
/**
 * Extended Math functions
 */

export namespace Maths {
  /**
   * Returns the square root of the sum of squares of its arguments.
   * @param a a
   * @param b b
   * @param c c 
   */
  export function hypot3(a: f32, b: f32, c: f32): f32 {
  	a = Mathf.abs(a)
  	b = Mathf.abs(b)
  	c = Mathf.abs(c)
  	Mathf.hypot
  
  	const s = max(a, b, c)
  	if (s == 0) return 0
  	const invs = <f32>1 / s
  	a *= invs
  	b *= invs
  	c *= invs
  	return s * Mathf.sqrt(a * a + b * b + c * c)
  }

  /**
   * Returns the square root of the sum of squares of its arguments.
   * @param a a
   * @param b b
   * @param c c
   * @param d d 
   */
  export function hypot4(a: f32, b: f32, c: f32, d: f32): f32 {
  	a = Mathf.abs(a)
  	b = Mathf.abs(b)
  	c = Mathf.abs(c)
  	d = Mathf.abs(d)
  
  	const s = Mathf.max(a, max(b, c, d))
  	if (s == 0) return 0
  	const invs = <f32>1 / s
  	a *= invs
  	b *= invs
  	c *= invs
  	d *= invs
  	return s * Mathf.sqrt(a * a + b * b + c * c + d * d)
  }

  /**
   * Returns the square root of the sum of squares of its arguments.
   * @param a a
   * @param b b
   * @param c c
   * @param d d
   * @param e e
   * @param f f
   * @param g g 
   */
  export function hypot7(a: f32, b: f32, c: f32, d: f32, e: f32, f: f32, g: f32): f32 {
  	a = Mathf.abs(a)
  	b = Mathf.abs(b)
  	c = Mathf.abs(c)
  	d = Mathf.abs(d)
  	e = Mathf.abs(e)
  	f = Mathf.abs(f)
  	g = Mathf.abs(g)
  
  	const s = max(a, max(b, c, d), max(e, f, g))
  	if (s == 0) return 0
  	const invs = <f32>1.0 / s
  	a *= invs
  	b *= invs
  	c *= invs
  	d *= invs
  	e *= invs
  	f *= invs
  	g *= invs
  	return s * Mathf.sqrt(a * a + b * b + c * c + d * d + e * e + f * f + g * g)
  }

  /**
   * Returns the square root of the sum of squares of its arguments.
   * @param a a
   * @param b b
   * @param c c
   * @param d d
   * @param e e
   * @param f f
   * @param g g
   * @param h h
   * @param i i 
   */
  export function hypot9(a: f32, b: f32, c: f32, d: f32, e: f32, f: f32, g: f32, h: f32, i: f32): f32 {
  	a = Mathf.abs(a)
  	b = Mathf.abs(b)
  	c = Mathf.abs(c)
  	d = Mathf.abs(d)
  	e = Mathf.abs(e)
  	f = Mathf.abs(f)
  	g = Mathf.abs(g)
  	h = Mathf.abs(h)
  	i = Mathf.abs(i)
  
  	const s = max(max(a, max(b, c, d), max(e, f, g)), h, i)
  	if (s == 0) return 0
  	const invs = <f32>1.0 / s
  	a *= invs
  	b *= invs
  	c *= invs
  	d *= invs
  	e *= invs
  	f *= invs
  	g *= invs
  	h *= invs
  	i *= invs
  	return s * Mathf.sqrt(a * a + b * b + c * c + d * d + e * e + f * f + g * g + h * h + i * i)
  }

  /**
   * Returns the square root of the sum of squares of its arguments.
   * @param a a
   * @param b b
   * @param c c
   * @param d d
   * @param e e
   * @param f f
   * @param g g
   * @param h h
   * @param i i
   * @param j j
   * @param k k
   * @param l l
   * @param m m
   * @param n n
   * @param o o
   * @param p p 
   */
  export function hypot16(a: f32, b: f32, c: f32, d: f32, e: f32, f: f32, g: f32, h: f32, i: f32, j: f32, k: f32, l: f32, m: f32, n: f32, o: f32, p: f32): f32 {
  	a = Mathf.abs(a)
  	b = Mathf.abs(b)
  	c = Mathf.abs(c)
  	d = Mathf.abs(d)
  	e = Mathf.abs(e)
  	f = Mathf.abs(f)
  	g = Mathf.abs(g)
  	h = Mathf.abs(h)
  	i = Mathf.abs(i)
  	j = Mathf.abs(j)
  	k = Mathf.abs(k)
  	l = Mathf.abs(l)
  	m = Mathf.abs(m)
  	n = Mathf.abs(n)
  	o = Mathf.abs(o)
  	p = Mathf.abs(p)
  
  	const s = Mathf.max(max(a, max(b, c, d), max(e, f, g)), max(max(h, i, j), max(k, l, m), max(n, o, p)))
  	if (s == 0) return 0
  	const invs = <f32>1.0 / s
  	a *= invs
  	b *= invs
  	c *= invs
  	d *= invs
  	e *= invs
  	f *= invs
  	g *= invs
  	h *= invs
  	j *= invs
  	k *= invs
  	l *= invs
  	m *= invs
  	n *= invs
  	o *= invs
  	p *= invs
  	return s * Mathf.sqrt(a * a + b * b + c * c + d * d + e * e + f * f + g * g + h * h + i * i + j * j + k * k + m * m + n * n + o * o + p * p)
  }

  /**
   * Returns the larger of a set of supplied numeric expressions.
   * @param a a
   * @param b b
   * @param c c
   */
  export function max(a: f32, b: f32, c: f32): f32 {
  	const q = Mathf.max(b, c)
  	return Mathf.max(a, q)
  }
}