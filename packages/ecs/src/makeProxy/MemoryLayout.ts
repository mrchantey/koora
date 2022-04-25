//std140 rules
//size in bytes
//align indicates the following: ptr % align = ok

export interface MemoryLayout{
	align: number
	size: number
	primitive?: boolean
}

export type MemoryLayoutMap = Record<string, MemoryLayout>
const makeMemoryLayout = <T extends MemoryLayoutMap>(layout: T) => layout

export const defaultMemoryLayoutMap = () => makeMemoryLayout({
	u8: { size: 1, align: 1, primitive: true },
	i8: { size: 1, align: 1, primitive: true },
	bool: { size: 1, align: 1, primitive: true },

	u16: { size: 2, align: 2, primitive: true },
	i16: { size: 2, align: 2, primitive: true },

	u32: { size: 4, align: 4, primitive: true },
	i32: { size: 4, align: 4, primitive: true },
	f32: { size: 4, align: 4, primitive: true },

	i64: { size: 8, align: 8, primitive: true },
	u64: { size: 8, align: 8, primitive: true },
	f64: { size: 8, align: 8, primitive: true },

	Vector2: { size: 8, align: 8 },
	Vector3: { size: 16, align: 16 }, //std140
	Vector3Unpadded: { size: 16, align: 16 },
	Vector4: { size: 16, align: 16 },
	Quaternion: { size: 16, align: 16 },

	Matrix: { size: 64, align: 16 }
})


/*
example a
{ a: f32, b: f32, c:vec3 }
|0 1 2 3 0 1 2 3 
|a b     c

*/