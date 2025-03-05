const LoginPage = () => {
  return (
    <main>
      <form>
        <label htmlFor='email'>Email:</label>
        <input type='text' id='email' required />

        <label htmlFor='pass'>Contraseña:</label>
        <input type='password' id='pass' required />

        <button>Login</button>
      </form>
    </main>
  );
};

export default LoginPage;
