import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

export function SubscribeButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!(status === "authenticated")) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const { data } = await api.post("/subscribe");
      const { sessionId } = data;
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      // TODO: improve error handling
      alert(error.message);
    }
  }
  return (
    <button
      type="button"
      className={styles.subScribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
