import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

const Login = () => {
  const auth = useAuth()
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;;

    if(!email || !password) {
      toast.error("Tous les champs sont obligatoires.")
      return;
    }
    try {
      toast.loading("Connexion en cours.", { id: "login" })
      await auth?.login(email, password)
      toast.success("Connexion réussie.", { id: "login" })
    } catch (error) {
      console.log(error)
      toast.error("Erreur lors de la connexion.", { id: "login" })
    }
  }

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img
          src="pngegg.png"
          alt="Robot IA"
          style={{
            width: "400px",
          }}
        />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Connexion
            </Typography>
            <CustomizedInput label="Email" name="email" type="email" />
            <CustomizedInput label="Password" name="password" type="password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                color: "#33003aff",
                ":hover": { bgcolor: "#ffffff", color: "#000000" },
              }}
              endIcon={<IoIosLogIn />}
            >
              Se connecter
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
