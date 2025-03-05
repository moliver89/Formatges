import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className='header-top'>
        <NavLink to='/'>
          <img src='/logo-header.jpg' alt='Logo Lord del Formatge' />
        </NavLink>
        <h1>Lord del Formatge</h1>
      </div>
      <nav>
        <NavLink to='/register'>Registrarse</NavLink>
        {' | '}
        <NavLink to='/login'>Login</NavLink>
      </nav>
    </header>
  );
};
export default Header;
