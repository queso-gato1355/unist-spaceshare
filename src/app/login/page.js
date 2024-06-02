// // src/app/login/page.js
// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { auth } from '../firebase';

// export default function LoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await auth.signInWithEmailAndPassword(formData.email, formData.password);
//       router.push('/');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-4">Log In</h1>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="email"
//             placeholder="ID"
//             className="border p-2 w-full rounded"
//             value={formData.email}
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
//           <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//             Log In
//           </button>
//           <button
//             className="text-blue-600"
//             onClick={() => router.push('/register')}
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }