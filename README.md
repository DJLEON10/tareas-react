# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



#dependencias o paquetes 
*npm install firebase
*nom install react-firebase-hooks
*npm install tailwind-c
*npm install react-router-dom 
*npm install sweetalert2




export default function Register() {
  const navigate = useNavigate();

  // UN SOLO ESTADO para manejar todos los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "", // Cambié de "nombres" a "nombre"
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (formData.confirmPassword.length > 0) {
      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden");
      } else {
        setError(""); // si son iguales se limpia
      }
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Extraemos los datos del formData
    const { nombre, apellido, email, password, confirmPassword } = formData;

    // Validación de campos obligatorios
    if (!nombre || !apellido || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Validación de longitud de contraseña
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña debe tener al menos 6 caracteres"
      });
      return;
    }

    setError("");

    try {
      const emaillower = email.toLowerCase();
      
      // Crear usuario en Firebase Authentication
      const userMethod = await createUserWithEmailAndPassword(auth, emaillower, password);
      const user = userMethod.user;

      // Guardar datos en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nombre,
        apellido,
        email: emaillower,
        password, // Nota: en producción no deberías guardar la contraseña en texto plano
        estado: "pendiente",
        rol: "visitante",
        creado: new Date(),
        metodo: "password"
      });

      // Mostrar mensaje de éxito y navegar DESPUÉS del registro exitoso
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Usuario registrado con éxito 🎉"
      }).then(() => {
        navigate("/login");
      });

    } catch (error) {
      console.error("Error de registro:", error);

      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Correo en uso",
          text: "Debe ingresar otro correo electrónico"
        });
      } else if (error.code === "auth/weak-password") {
        Swal.fire({
          icon: "error",
          title: "Contraseña débil",
          text: "La contraseña debe tener al menos 6 caracteres"
        });
      } else if (error.code === "auth/invalid-email") {
        Swal.fire({
          icon: "error",
          title: "Email inválido",
          text: "Por favor ingrese un email válido"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error durante el registro. Intente nuevamente."
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };