import React, { useState, useEffect } from 'react'
import InputField from '../components/InputField';
import panda from '../assets/panda.jpg';
import bunny from '../assets/bunny.png';
import typewriter from '../assets/typewriter.png';
import notebook from '../assets/notebook.svg';
import typewriter2 from '../assets/typewriter2.svg';
import {
  Paper, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Container, Group
} from '@mantine/core';
import '../styles/login.css'


const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4004/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({ emailOrUsername, password }),
      })
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="container">
        <div className="leftColumn">
          <img className="image" src={typewriter2} />
        </div>
        <div className="rightColumn">
          <div className="rightColumnContent">
            <Container className="loginContainer" size={420} >
              <form onSubmit={handleSubmit}>
                <Title
                  align="center"
                  sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                  Welcome to My Diary.co
                </Title>
                <Text color="dimmed" align="center" mt={5}>
                  Keep track of your inner most private thoughts!
                </Text>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                  Do not have an account yet?{' '}
                  <Anchor size="sm" component="button" className="links">
                    Create account
                  </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                  <TextInput label="Email" placeholder="you@mantine.dev" value={emailOrUsername} required />
                  <PasswordInput label="Password" placeholder="Your password" required mt="md" value={password} />
                  <Group position="apart" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm" className="links">
                      Forgot password?
                    </Anchor>
                  </Group>
                  <Button fullWidth mt="xl" className="btn">
                    Sign in
                  </Button>
                </Paper>
              </form>
            </Container>
          </div>
        </div>
      </div >

    </>
  )
}

export default Login