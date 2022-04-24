//std140 rules
//size in bytes
//align indicates the following: ptr % align = ok


export class MemoryLayout{
	align: number
	size: number
	primitive?: boolean = false
	
	static u8: MemoryLayout = { size: 1, align: 1, primitive: true }
	static i8: MemoryLayout = { size: 1, align: 1, primitive: true }
	static bool: MemoryLayout = { size: 1, align: 1, primitive: true }
	
	static u16: MemoryLayout = { size: 2, align: 2, primitive: true }
	static i16: MemoryLayout = { size: 2, align: 2, primitive: true }
	
	static u32: MemoryLayout = { size: 4, align: 4, primitive: true }
	static i32: MemoryLayout = { size: 4, align: 4, primitive: true }
	static f32: MemoryLayout = { size: 4, align: 4, primitive: true }
	
	static i64: MemoryLayout = { size: 8, align: 8, primitive: true }
	static u64: MemoryLayout = { size: 8, align: 8, primitive: true }	
	static f64: MemoryLayout = { size: 8, align: 8, primitive: true }
	
	static Vector2: MemoryLayout = { size: 8, align: 8 }
	static Vector3: MemoryLayout = { size: 16, align: 16 }//std140
	static Vector3Unpadded: MemoryLayout = { size: 16, align: 16 }
	static Vector4: MemoryLayout = { size: 16, align: 16 }
	static Quaternion: MemoryLayout = { size: 16, align: 16 }
	
	static Matrix: MemoryLayout = { size: 64, align: 16 }
}


/*
example a
{ a: f32, b: f32, c:vec3 }
|0 1 2 3 0 1 2 3 
|a b     c

*/