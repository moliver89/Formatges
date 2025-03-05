const RegisterPage = () => {
  return (
    <main>
      <main>
        <form>
          <label htmlFor='email'>Email:</label>
          <input type='text' id='email' required />

          <label htmlFor='pass'>Contraseña:</label>
          <input type='password' id='pass' required />

          <label htmlFor='repPass'>Repetir Contraseña:</label>
          <input type='password' id='repPass' required />

          <button>Registrarse</button>
        </form>
      </main>
    </main>
  );
};

export default RegisterPage;
