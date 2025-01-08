
// Grade Data
const graderData = [
  {id:1, grade_desc: 'الأول الإبتدائى'},
  {id:2, grade_desc: 'الثانى الإبتدائى'},
  {id:3, grade_desc: 'الثالث الإبتدائى'},
  {id:4, grade_desc: 'الرابع الإبتدائى'},
  {id:5, grade_desc: 'الخامس الإبتدائى'},
  {id:6, grade_desc: 'السادس الإبتدائى'},
  {id:7, grade_desc: 'الأول الإعدادى'},
  {id:8, grade_desc: 'الثانى الإعدادى'},
  {id:9,  grade_desc: 'الثالث الإعدادى'},
  {id:10,  grade_desc: 'KG1'},
  {id:11, grade_desc: 'KG2'},
]
// Classe Dtat
const classeData = [
  {id:1, class_desc: '1-1',grade_Id:1},
  {id:2, class_desc: '1-2',grade_Id:1},
  {id:3, class_desc: '1-3',grade_Id:1},
  {id:4, class_desc: '2-1',grade_Id:2},
  {id:5, class_desc: '2-2',grade_Id:2},
  {id:6, class_desc: '2-3',grade_Id:2},
  {id:7, class_desc: '3-1',grade_Id:3},
  {id:8, class_desc: '3-2',grade_Id:3},
  {id:9, class_desc: '3-3',grade_Id:3},
  {id:10, class_desc: '4-1',grade_Id:4},
  {id:11, class_desc: '4-2',grade_Id:4},
  {id:12, class_desc: '4-3',grade_Id:4},
  {id:13, class_desc: '5-1',grade_Id:5},
  {id:14, class_desc: '5-2',grade_Id:5},
  {id:15, class_desc: '5-3',grade_Id:5},
  {id:16, class_desc: '6-1',grade_Id:6},
  {id:17, class_desc: '6-2',grade_Id:6},
  {id:18, class_desc: '6-3',grade_Id:6},
  {id:19,class_desc: '1-1 ع',grade_Id:7},
  {id:20, class_desc: '1-2 ع',grade_Id:7},
  {id:21, class_desc: '2-1 ع',grade_Id:8},
  {id:22, class_desc: '2-2 ع',grade_Id:8},
  {id:23, class_desc: '3-1 ع',grade_Id:9},
  {id:24, class_desc: '3-2 ع',grade_Id:9},
  {id:25, class_desc: 'KG1-A',grade_Id:10},
  {id:26, class_desc: 'KG1-B',grade_Id:10},
  {id:27,class_desc: 'KG2-A',grade_Id:11},
  {id:28,class_desc: 'KG2-B',grade_Id:11},
]
// Test kind Data
const testKindData = [
  {id:1, testkind_desc:'شهر أكتوبر'},
  {id:2, testkind_desc:'شهر نوفمبر'},
  {id:3, testkind_desc:'نصف العام'},
  {id:4, testkind_desc:'شهر فبراير'},
  {id:5, testkind_desc:'شهر مارس'},
  {id:6, testkind_desc:'أخر العام'},
]


module.exports = {
  graderData,
  classeData,
  testKindData,
}