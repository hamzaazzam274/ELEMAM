<template>
  <div>
    <button @click="makePayment" class="border p-2.5">Make Payment</button>
  </div>
</template>

<script>
export default {
  name: "VodafoneCashPayment",
  data() {
    return {
      API_KEY:
        "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RRd056UXdMQ0p1WVcxbElqb2lNVGN3TURreE56SXhPQzR6TmpnNU16Y2lmUS5QVzQtRXV3YU9kWHlreUt4TEVFdi15UkdRWGVMbUVaQnFxOE1nVFFISEtxeGd6LWl2ZTNRTmZPQlVINFQ5XzdLZGNfY1pBQXd5UlNZb1FlNld3ajREQQ==",
      // Replace with your actual Paymob API key
      walletNumber: "01010101010", // Vodafone Cash number
      paymentToken: "", // To store the payment token obtained in step 3
    };
  },
  methods: {
    async makePayment() {
      try {
        // Step 1: Obtain the payment token
        this.paymentToken = await this.getToken();

        // Step 2: Prepare the payment request data
        const paymentData = {
          source: {
            identifier: this.walletNumber,
            subtype: "WALLET",
          },
          payment_token: this.paymentToken,
        };

        // Step 3: Make the payment request
        const paymentResponse = await this.makeFetchRequest(
          "https://accept.paymob.com/api/acceptance/payments/pay",
          "POST",
          paymentData
        );

        // Step 4: Handle the payment response
        console.log("Payment Response:", paymentResponse);

        // Step 5: Redirect the user to the payment URL
        const redirectUrl = paymentResponse.redirect_url;
        window.location.href = redirectUrl;
      } catch (error) {
        // Step 6: Handle errors
        console.error("Payment Failed:", error);
      }
    },

    async getToken() {
      // Step 1: Request a token from Paymob
      const tokenResponse = await this.makeFetchRequest(
        "https://accept.paymob.com/api/auth/tokens",
        "POST",
        { api_key: this.API_KEY }
      );

      // Return the obtained token
      return tokenResponse.token;
    },

    async makeFetchRequest(url, method, data) {
      // Step 2: Make a fetch request with the provided method, data, and API key
      const headers = {
        "Content-Type": "application/json",
      };

      if (method === "POST") {
        headers["Authorization"] = `Bearer ${this.API_KEY}`;
      }

      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
      });

      // Return the JSON response
      return await response.json();
    },
  },
};
</script>
