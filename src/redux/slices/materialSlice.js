// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   getSubjectMaterialsService,
//   addMaterial,
//   deleteMaterial,
// } from "../services/materialService";

// const initialState = {
//   materialsBySubjectId: {},
//   loading: false,
//   error: null,
// };

// // ================= GET =================
// export const getSubjectMaterials = createAsyncThunk(
//   "materials/getSubjectMaterials",
//   async (subjectId, thunkAPI) => {
//     try {
//       const data = await getSubjectMaterialsService(subjectId);
//       return { subjectId, data };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to fetch materials"
//       );
//     }
//   }
// );

// // ================= ADD =================
// export const createMaterial = createAsyncThunk(
//   "materials/createMaterial",
//   async ({ subjectId, file, lectureNumber, onProgress }, thunkAPI) => {
//     try {
//       const result = await addMaterial(
//         subjectId,
//         file,
//         lectureNumber,
//         (event) => {
//           const percent = Math.round((event.loaded * 100) / event.total);
//           onProgress?.(percent);
//         }
//       );

//       return { subjectId, material: result };
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || "Error");
//     }
//   }
// );
// // ================= DELETE =================
// export const removeMaterial = createAsyncThunk(
//   "materials/removeMaterial",
//   async ({ subjectId, materialId }, thunkAPI) => {
//     try {
//       await deleteMaterial(materialId, subjectId);
//       return { subjectId, materialId };
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || "Error");
//     }
//   }
// );

// const materialSlice = createSlice({
//   name: "materials",
//   initialState,

//   reducers: {
//     clearMaterials: (state) => {
//       state.materialsBySubjectId = {};
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       // ================= GET =================
//       .addCase(getSubjectMaterials.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getSubjectMaterials.fulfilled, (state, action) => {
//         state.loading = false;

//         const { subjectId, data } = action.payload;
//         state.materialsBySubjectId[subjectId] = data;
//       })
//       .addCase(getSubjectMaterials.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ================= ADD =================
//       .addCase(createMaterial.fulfilled, (state, action) => {
//         const { subjectId, material } = action.payload;

//         if (!state.materialsBySubjectId[subjectId]) {
//           state.materialsBySubjectId[subjectId] = [];
//         }

//         state.materialsBySubjectId[subjectId].push(material);
//       })

//       // ================= DELETE =================
//       .addCase(removeMaterial.fulfilled, (state, action) => {
//         const { subjectId, materialId } = action.payload;

//         state.materialsBySubjectId[subjectId] =
//           state.materialsBySubjectId[subjectId]?.filter(
//             (m) => m.id !== materialId
//           );
//       });
//   },
// });

// export const { clearMaterials } = materialSlice.actions;
// export default materialSlice.reducer;












import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSubjectMaterialsService,
  addMaterial,
  deleteMaterial,
} from "../services/materialService";

const initialState = {
  materialsBySubjectId: {},
  loading: false,
  error: null,
};

// ================= GET =================
export const getSubjectMaterials = createAsyncThunk(
  "materials/getSubjectMaterials",
  async (subjectId, thunkAPI) => {
    try {
      const data = await getSubjectMaterialsService(subjectId);

      return {
        subjectId: String(subjectId), // 🔥 مهم جدًا
        data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch materials"
      );
    }
  }
);

// ================= ADD =================
export const createMaterial = createAsyncThunk(
  "materials/createMaterial",
  async ({ subjectId, file, lectureNumber, onProgress }, thunkAPI) => {
    try {
      const result = await addMaterial(
        subjectId,
        file,
        lectureNumber,
        (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress?.(percent);
        }
      );

      return {
        subjectId: String(subjectId), // 🔥 مهم جدًا
        material: result,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error");
    }
  }
);

// ================= DELETE =================
export const removeMaterial = createAsyncThunk(
  "materials/removeMaterial",
  async ({ subjectId, materialId }, thunkAPI) => {
    try {
      await deleteMaterial(materialId, subjectId);

      return {
        subjectId: String(subjectId), // 🔥 مهم جدًا
        materialId,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error");
    }
  }
);

const materialSlice = createSlice({
  name: "materials",
  initialState,

  reducers: {
    clearMaterials: (state) => {
      state.materialsBySubjectId = {};
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= GET =================
      .addCase(getSubjectMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectMaterials.fulfilled, (state, action) => {
        state.loading = false;

        const { subjectId, data } = action.payload;

        state.materialsBySubjectId[subjectId] = data;
      })
      .addCase(getSubjectMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= ADD =================
      .addCase(createMaterial.fulfilled, (state, action) => {
        const { subjectId, material } = action.payload;

        if (!state.materialsBySubjectId[subjectId]) {
          state.materialsBySubjectId[subjectId] = [];
        }

        state.materialsBySubjectId[subjectId].push(material);
      })

      // ================= DELETE =================
      .addCase(removeMaterial.fulfilled, (state, action) => {
        const { subjectId, materialId } = action.payload;

        state.materialsBySubjectId[subjectId] =
          state.materialsBySubjectId[subjectId]?.filter(
            (m) => m.id !== materialId
          ) || [];
      });
  },
});

export const { clearMaterials } = materialSlice.actions;
export default materialSlice.reducer;