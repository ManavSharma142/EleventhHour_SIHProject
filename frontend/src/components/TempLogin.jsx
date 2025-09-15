import React, { useState } from 'react';

// Reusable SVG component for the brand logo
const FlexoraLogo = () => (
  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor"></path>
    <path d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor"></path>
  </svg>
);

// Reusable SVG component for the Google logo
const GoogleLogo = () => (
    <svg className="h-6 w-6" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"></path>
        <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"></path>
        <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.651-3.356-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"></path>
        <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.38,36.14,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"></path>
    </svg>
);


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder for your login logic
    console.log("Logging in with:", { email, password });
    alert(`Signing in with email: ${email}`);
  };
  
  const handleGoogleLogin = () => {
    // Placeholder for your Google Sign-In logic
    window.location.href = "http://localhost:8000/google/login";
  };

  return (
    <div className="bg-[#0B111D] text-white font-sans">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="flex h-full grow flex-col">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#2A3751] px-10 py-4">
            <div className="flex items-center gap-4">
              <div className="size-7 text-[var(--primary-color)]">
                <FlexoraLogo />
              </div>
              <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Flexora</h2>
            </div>
            <div className="flex items-center gap-8">
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#D1D5DB]">
                <a className="hover:text-white transition-colors duration-300" href="#">Home</a>
                <a className="hover:text-white transition-colors duration-300" href="#">Workouts</a>
                <a className="hover:text-white transition-colors duration-300" href="#">Nutrition</a>
                <a className="hover:text-white transition-colors duration-300" href="#">Community</a>
              </nav>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[#232f48] hover:bg-[#2A3751] transition-all duration-300 ease-in-out text-white text-sm font-bold shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgb(0,0,0,0.2)]">
                <span className="truncate">Sign Up</span>
              </button>
            </div>
          </header>
          
          <main className="flex flex-1 items-center justify-center py-16">
            <div className="w-full max-w-md p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-white">Welcome Back</h1>
                <p className="text-lg text-gray-400 mt-2">Sign in to continue your fitness journey.</p>
              </div>

              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">Email</label>
                  <div className="relative">
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      autoComplete="email" 
                      required 
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input block w-full rounded-lg border-transparent bg-[#1C2539] h-14 p-4 text-white placeholder-[#6C7A99] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-300 ease-in-out shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgb(0,0,0,0.2)] focus:shadow-[0_6px_20px_0_rgb(13,64,165,0.3)]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="password">Password</label>
                    <a className="text-sm text-[var(--primary-color)] hover:underline transition-colors duration-300" href="#">Forgot Password?</a>
                  </div>
                  <div className="mt-2 relative">
                    <input 
                      id="password" 
                      name="password" 
                      type="password" 
                      autoComplete="current-password" 
                      required 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input block w-full rounded-lg border-transparent bg-[#1C2539] h-14 p-4 text-white placeholder-[#6C7A99] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-300 ease-in-out shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgb(0,0,0,0.2)] focus:shadow-[0_6px_20px_0_rgb(13,64,165,0.3)]"
                    />
                  </div>
                </div>

                <div>
                  <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-[var(--primary-color)] h-12 px-5 text-base font-bold text-white shadow-[0_4px_14px_0_rgb(13,64,165,0.4)] hover:bg-blue-600 hover:shadow-[0_6px_20px_0_rgb(13,64,165,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-[#0B111D] transition-all duration-300 ease-in-out">
                    Sign In
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2A3751]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-[#0B111D] px-2 text-gray-400">Or continue with</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button 
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#232f48] h-12 px-5 text-base font-medium text-white shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:bg-[#2A3751] hover:shadow-[0_6px_20px_0_rgb(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-[#0B111D] transition-all duration-300 ease-in-out"
                  >
                    <GoogleLogo />
                    <span className="text-center font-semibold">Sign in with Google</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';

// const FlexoraLogo = () => (
//   <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
//     <path d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor"></path>
//     <path d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor"></path>
//   </svg>
// );

// const GoogleLogo = () => (
//     <svg className="h-6 w-6" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
//         <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"></path>
//         <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"></path>
//         <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.651-3.356-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"></path>
//         <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.38,36.14,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"></path>
//     </svg>
// );

// export default function TempLogin() { // Corrected name
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log("Logging in with:", { email, password });
//     alert(`Signing in with email: ${email}`);
//   };
  
//   const handleGoogleLogin = () => {
//     console.log("Redirecting to Google Sign-In...");
//     alert("Signing in with Google");
//   };

//   return (
//     <div className="bg-[#0B111D] text-white font-sans">
//       <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
//           {/* JSX content remains the same */}
//       </div>
//     </div>
//   );
// }