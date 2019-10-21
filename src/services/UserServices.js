import gql from 'graphql-tag'

export default {
    addUser(apollo,email,password,repeatPassword,firstName){
        return apollo.mutate({
            mutation:gql `mutation addingAUser($email: String!,$password:String!,$userName:String!,$confirmPassword:String!,$gender:String!,$dob:String!){
              addUser(email:$email,password:$password,userName:$userName,confirmPassword:$confirmPassword,gender:$gender,dob:$dob){
                email,
                userName
             }
            }`,
            variables:{
              email,
              userName: firstName,
              password,
              confirmPassword:repeatPassword,
              gender:'Male',
              dob:'19/06/1994'
            }
          })
    }   
}