import React, { useState } from 'react';

// Reusable component for the brand logo SVG
const FlexoraLogo = () => (
  <svg className="h-8 w-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor"></path>
    <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
  </svg>
);

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    fitnessGoal: '',
    experience: ''
  });

  const [ageError, setAgeError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Logic to set or clear the age error message during input
    if (name === 'age') {
      if (Number(value) < 0) {
        setAgeError('Age cannot be negative.');
      } else {
        setAgeError('');
      }
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check before submitting the form
    if (Number(formData.age) < 0) {
      setAgeError('Please enter a valid age.');
      return; // Stop the submission if age is invalid
    }

    // If validation passes, you can proceed with form submission
    console.log("Form submitted:", formData);
    alert("Sign-up successful! Check the console for form data.");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[var(--background-color)] text-[var(--text-primary)] overflow-x-hidden">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[var(--secondary-color)] px-10 py-4 shadow-lg">
        <div className="flex items-center gap-3 text-white">
          <FlexoraLogo />
          <h1 className="text-white text-2xl font-bold tracking-tight">Flexora</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-white text-sm font-medium leading-normal hover:text-[var(--primary-color)] transition-colors" href="#">Home</a>
          <a className="text-white text-sm font-medium leading-normal hover:text-[var(--primary-color)] transition-colors" href="#">Workouts</a>
          <a className="text-white text-sm font-medium leading-normal hover:text-[var(--primary-color)] transition-colors" href="#">Nutrition</a>
          <a className="text-white text-sm font-medium leading-normal hover:text-[var(--primary-color)] transition-colors" href="#">Community</a>
        </nav>
        <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-5 bg-transparent border border-white text-white text-sm font-bold tracking-[0.015em] hover:bg-white hover:text-[var(--background-color)] transition-colors duration-300">
          <span className="truncate">Log In</span>
        </button>
      </header>

      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-[var(--secondary-color)]/30 p-10 shadow-2xl backdrop-blur-sm">
          <div>
            <h2 className="text-center text-3xl font-bold tracking-tight text-white">Create Your Flexora Account</h2>
            <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">Join our community and start your fitness journey today.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1" htmlFor="name">Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined input-icon"> person </span>
                  <input id="name" name="name" type="text" autoComplete="name" required placeholder="Your name" value={formData.name} onChange={handleChange} className="form-input form-input-with-icon" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1" htmlFor="email">Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined input-icon"> mail </span>
                  <input id="email" name="email" type="email" autoComplete="email" required placeholder="Email" value={formData.email} onChange={handleChange} className="form-input form-input-with-icon" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1" htmlFor="password">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined input-icon"> lock </span>
                  <input id="password" name="password" type="password" autoComplete="new-password" required placeholder="Create a password" value={formData.password} onChange={handleChange} className="form-input form-input-with-icon" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1" htmlFor="age">Age</label>
                <div className="relative">
                  <span className="material-symbols-outlined input-icon"> cake </span>
                  <input 
                    id="age" 
                    name="age" 
                    type="number" 
                    required 
                    placeholder="Age" 
                    value={formData.age} 
                    onChange={handleChange} 
                    min="0"
                    className={`form-input form-input-with-icon ${ageError ? 'border-red-500 focus:ring-red-500' : ''}`} 
                  />
                </div>
                {ageError && <p className="mt-1 text-sm text-red-500">{ageError}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1" htmlFor="gender">Gender</label>
                <div className="relative">
                  <span className="material-symbols-outlined input-icon"> wc </span>
                  <select id="gender" name="gender" required value={formData.gender} onChange={handleChange} className="form-input form-input-with-icon select-input">
                    <option className="bg-[var(--secondary-color)]" disabled value="">Select Gender</option>
                    <option className="bg-[var(--secondary-color)]" value="Male">Male</option>
                    <option className="bg-[var(--secondary-color)]" value="Female">Female</option>
                    <option className="bg-[var(--secondary-color)]" value="Non-binary">Non-binary</option>
                    <option className="bg-[var(--secondary-color)]" value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1" htmlFor="fitness-goal">Fitness Goal</label>
                <div className="relative">
                  <span className="material-symbols-outlined input-icon"> fitness_center </span>
                  <select id="fitness-goal" name="fitnessGoal" required value={formData.fitnessGoal} onChange={handleChange} className="form-input form-input-with-icon select-input">
                    <option className="bg-[var(--secondary-color)]" disabled value="">Select Fitness Goal</option>
                    <option className="bg-[var(--secondary-color)]" value="Lose Weight">Lose Weight</option>
                    <option className="bg-[var(--secondary-color)]" value="Build Muscle">Build Muscle</option>
                    <option className="bg-[var(--secondary-color)]" value="Improve Endurance">Improve Endurance</option>
                    <option className="bg-[var(--secondary-color)]" value="Stay Active">Stay Active</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1" htmlFor="experience">Experience Level</label>
                <div className="relative">
                  <span className="material-symbols-outlined input-icon"> trending_up </span>
                  <select id="experience" name="experience" required value={formData.experience} onChange={handleChange} className="form-input form-input-with-icon select-input">
                    <option className="bg-[var(--secondary-color)]" disabled value="">Select Level</option>
                    <option className="bg-[var(--secondary-color)]" value="Beginner">Beginner</option>
                    <option className="bg-[var(--secondary-color)]" value="Intermediate">Intermediate</option>
                    <option className="bg-[var(--secondary-color)]" value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-[var(--primary-color)] py-3 px-4 text-base font-bold text-white shadow-lg shadow-[var(--primary-color)]/20 hover:shadow-xl hover:shadow-[var(--primary-color)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[var(--background-color)] transition-all duration-300">
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-[var(--text-secondary)]">
            Already have an account?
            <a className="font-medium text-[var(--primary-color)] hover:text-opacity-80 underline" href="#"> Log In</a>
          </p>
        </div>
      </main>
    </div>
  );
}