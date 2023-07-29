import { withAdmin } from 'ProtectedRoutes/AdminRoute';
import UsersTable from 'components/general/PaymentHistoryTable/Table';
import { db } from 'components/firebase/firebase-config';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';



const app = ({rows}: {rows: any}) => {

  return (
    <>
      <UsersTable rows={rows}/>
  </>
  );
};


export async function getStaticProps() {
  
  const ref = collection(db, "Userdata");
  const q = query(ref, orderBy('MostRecentPaymentHistory'), limit(10));
  const docSnap = await getDocs(q);
  const rows = docSnap.docs.map((doc: any) => ({
    id: doc.id,
    name: `${doc.data().fname} ${doc.data().lname}`,
    email: doc.data().email,
    payments: doc.data().payments,
  }));

  
  // Pass data to the page via props
  return { props: { rows } };
}

export default withAdmin(app);