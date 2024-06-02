// // src/app/register/page.js
// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { auth, firestore } from '../firebase';

// export default function RegisterPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     nickname: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert('비밀번호가 일치하지 않습니다.');
//       return;
//     }

//     try {
//       const { user } = await auth.createUserWithEmailAndPassword(
//         formData.email,
//         formData.password
//       );

//       await firestore.collection('users').doc(user.uid).set({
//         nickname: formData.nickname,
//         email: formData.email,
//       });

//       alert('회원가입이 완료되었습니다.');
//       router.push('/login');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="flex justify-center mb-4">
//             <div className="w-32 h-32 bg-gray-300"></div>
//           </div>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="border p-2 w-full rounded"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="nickname"
//             placeholder="Nickname"
//             className="border p-2 w-full rounded"
//             value={formData.nickname}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="border p-2 w-full rounded"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             className="border p-2 w-full rounded"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//           />
//           <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//             Register!
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }