

//std140 rules
//size in bytes
//align indicates the following: ptr % align = ok
export class MemoryLayout{
	align: u8
	size: u32
	static u8: MemoryLayout = { size: 1, align: 1 }
	static i8: MemoryLayout = { size: 1, align: 1 }
	
	static u16: MemoryLayout = { size: 2, align: 2 }
	static i16: MemoryLayout = { size: 2, align: 2 }
	
	static u32: MemoryLayout = { size: 4, align: 4 }
	static i32: MemoryLayout = { size: 4, align: 4 }
	static f32: MemoryLayout = { size: 4, align: 4 }
	
	static i64: MemoryLayout = { size: 8, align: 8 }
	static u64: MemoryLayout = { size: 8, align: 8 }	
	static f64: MemoryLayout = { size: 8, align: 8 }
	
	static Vector2: MemoryLayout = { size: 8, align: 8 }
	static Vector3: MemoryLayout = { size: 16, align: 16 }//std140
	static Vector3Packed: MemoryLayout = { size: 16, align: 16 }//std140
	static Vector4: MemoryLayout = { size: 16, align: 16 }//std140
	
	static Matrix: MemoryLayout = { size: 64, align: 16 }
}

export class ComponentLayout{

	offsets: StaticArray<u32>
	size: u32
	totalPadding: u16 = 0
	sizeAligned: u32 = 0

	constructor(primitives: MemoryLayout[]){
		let align: u32 = 0
		let maxAlign: u8 = 0
		const offsets = new StaticArray<u32>(primitives.length)
		for (let i = 0; i < primitives.length; i++){
			if (primitives[i].align !== 0)
				while (align % primitives[i].align !== 0){
					align++
					this.totalPadding++
				}
			offsets[i] = align
			align += primitives[i].size
			if (primitives[i].align > maxAlign)
				maxAlign = primitives[i].align
		}
		this.offsets = offsets
		this.size = align

		this.sizeAligned = this.size
		while (this.sizeAligned % maxAlign !== 0)
			this.sizeAligned++
	}
}

/*
example a
{ a: f32, b: f32, c:vec3 }
|0 1 2 3 0 1 2 3 
|a b     c

*/