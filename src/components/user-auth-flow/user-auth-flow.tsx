'use client'
import { useActionState, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { login } from '@/app/actions/auth';
import { TriangleAlert } from 'lucide-react';

export default function UserAuthFlow() {
    const [state, action, isPending] = useActionState(login, undefined);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const errorRef: any = useRef(null);
    const emailRef: any = useRef(null);
    const passwordRef: any = useRef(null);
    const buttonRef: any = useRef(null);

    const showPasswordField = () => {
        if (passwordRef.current) {
            passwordRef.current.classList.remove(styles.invisible);
            passwordRef.current.classList.add(styles.growIn);
            passwordRef.current.focus();
        }
    };

    useEffect(() => {
        setPassword("");
        errorRef.current.classList.remove(styles.errorContentFull);

        setTimeout(() => {
            emailRef.current.classList.remove(styles.loading);
            passwordRef.current.classList.remove(styles.loading);
            if (state?.error) {
                errorRef.current.classList.add(styles.errorContentFull);
            }
        }, 1000);
    }, [state]);

    useEffect(() => {
        if (password.length >= 8) {
            if (buttonRef.current.classList.contains(styles.invisible)) {
                buttonRef.current.classList.remove(styles.invisible);
                buttonRef.current.classList.add(styles.buttonShow);
            }
        }
    }, [password]);

    return (
        <div>
            <form action={action}>
                <div ref={errorRef} className={styles.errorContainer}>
                    <TriangleAlert /> {state?.error}
                </div>
                <input
                    ref={emailRef}
                    disabled={isPending}
                    type="email"
                    id="email"
                    value={email}
                    name="email"
                    placeholder="Email"
                    className={styles.input}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            showPasswordField();
                            e.preventDefault();
                        }
                    }}
                />
                <input
                    disabled={isPending}
                    ref={passwordRef}
                    id="password"
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    className={`${styles.input} ${styles.invisible}`}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    ref={buttonRef}
                    className={`${styles.button} ${styles.invisible}`}
                    disabled={isPending} // Disable while pending
                >
                    Login
                </button>
            </form>
        </div>
    );
}
