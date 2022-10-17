<template>
  <q-page padding class="row justify-center items-center">
    <q-card class="q-pa-md login-card">
      <q-card-section class="text-center">
        <q-img style="height: 64px" src="../../assets/logo.png" fit="scale-down"/>
      </q-card-section>
      <q-card-section class="text-center">
        <h4 class="q-mt-xs q-mb-md text-bold">Sign In</h4>
        <p class="muted-text">Log in to your account to continue</p>
      </q-card-section>
      <q-form @submit="onLogin">
        <q-card-section class="q-gutter-md">
          <div>
            <p class="q-mb-xs q-ml-sm text-bold muted-text">Username</p>
            <q-input outlined dense v-model="accountData.username" placeholder="Enter Username"/>
          </div>
          <div>
            <p class="q-mb-xs q-ml-sm text-bold muted-text">Password</p>
            <q-input outlined dense v-model="accountData.password" type="password" placeholder="Enter Password"/>
          </div>
        </q-card-section>
        <q-card-section class="text-center">
          <q-btn class="full-width" label="Log in" type="submit" color="primary" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      accountData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async onLogin() {
      try {
        await this.$store.dispatch('login', this.accountData);

        this.$notify.create({
          message: `User ${this.accountData.username} has entered the Application!`,
          color: 'blue',
          icon: 'check'
        });

        this.$router.push({ name: 'dashboard.dashboard' });
      } catch({ response: { data } }) {
        this.accountData.password = '';

        this.$notify.create({
          message: data.message,
          color: 'red',
          icon: 'blocked'
        });
      }
    }
  }
}
</script>

<style scoped>
  .login-card {
    width: 450px;
  }

  .muted-text {
    color: #9EAFC1;
  }
</style>