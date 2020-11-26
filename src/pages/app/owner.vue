<template>
  <q-page class=" bg-violet text-midnight">
    <q-btn
      rounded
      label="Add Owner"
      icon="mood"
      color="cadet"
      style="margin-left:80%;margin-top:3%"
      to="/app/newowner"
    ></q-btn>
    <q-separator horizontal class="transparent" />
    <center>
      <q-table
        grid
        card-class="bg-midnight text-white"
        title="Owners"
        :data="data"
        :columns="columns"
        row-key="name"
        hide-header
        style="width:80%"
      >
      </q-table>
    </center>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      client: require("graphql-client")({
        url: "http://127.0.0.1:8000/graphql"
      }),
      columns: [
        {
          name: "name",
          required: true,
          label: "Name: ",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "address",
          label: "Address:",
          field: "address",
          sortable: true
        },
        { name: "email", label: "Email: ", field: "email", sortable: true },
        {
          name: "phone",
          label: "Tel. :",
          field: "phone",
          sortable: true
        }
      ],
      data: []
    };
  },
  created() {
    var info = [];
    this.client
      .query(
        "query { allOwners { edges { node { id, firstName, middleName, firstLname, secondLname, address, email, phone }  }   } }",
        {}
      )
      .then(function(body) {
        console.log(body);
        body.data.allOwners.edges.forEach(element => {
          var temp = { name: "", address: "", email: "", phone: "" };
          temp.name =
            element.node.firstName +
            " " +
            element.node.middleName +
            " " +
            element.node.firstLname +
            " " +
            element.node.secondLname;
          temp.address = element.node.address;
          temp.email = element.node.email;
          temp.phone = element.node.phone;
          console.log(temp);
          info.push(temp);
        });
      })
      .catch(function(err) {
        console.log("Error" + err.message);
      });
    this.data = info;
  }
};
</script>
