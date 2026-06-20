"use client";

import useAuthForm from "../../hooks/useAuthForm";
import AuthButton from "./AuthButton";
import AuthInputField from "./AuthInputField";
import AuthLogo from "./AuthLogo";
import AuthSwitch from "./AuthSwitch";
import AuthWrapper from "./AuthWrapper";
import styles from "../css/AuthPage.module.css";

function AuthPanel() {
    const {
        authMode,
        formValues,
        isLogin,
        isSubmitting,
        handleInputChange,
        handleSubmit,
        switchAuthMode,
    } = useAuthForm();

    return (
        <AuthWrapper>
            <AuthLogo />

            <section className={styles.header}>
                <h1 className={styles.title}>{isLogin ? "Welcome back!" : "Create your account"}</h1>
                <p className={styles.subtitle}>
                    {isLogin ? "Login to access your dashboard" : "Start managing your links and analytics"}
                </p>
            </section>

            <form className={styles.form} onSubmit={handleSubmit}>
                {!isLogin && (
                    <AuthInputField
                        icon="user"
                        id="signup-name"
                        label="User name"
                        name="name"
                        placeholder="Enter your user name"
                        type="text"
                        value={formValues.name}
                        onChange={handleInputChange}
                    />
                )}

                <AuthInputField
                    icon="mail"
                    id={authMode + "-email"}
                    label="Email address"
                    name="email"
                    placeholder="you@example.com"
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                />

                <AuthInputField
                    hint={!isLogin ? "At least 8 characters" : undefined}
                    icon="lock"
                    id={authMode + "-password"}
                    label="Password"
                    name="password"
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                    type="password"
                    value={formValues.password}
                    onChange={handleInputChange}
                />

                <AuthButton disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Please wait" : isLogin ? "Log in" : "Sign up"}
                </AuthButton>
            </form>

            <AuthSwitch
                actionLabel={isLogin ? "Sign up" : "Log in"}
                label={isLogin ? "Don't have an account?" : "Already have an account?"}
                onClick={switchAuthMode}
            />
        </AuthWrapper>
    );
}

export default AuthPanel;
