import React, { useContext } from 'react'
import { VariableContext } from '../../context/VariableContext'
import { useAuth0 } from '@auth0/auth0-react'
import { usePostOrder } from '../../hooks/usePostOrder'
import { useNavigate } from 'react-router-dom'

const Payments = () => {
  const {selected,setSelected,payment,setPayment,input1,input2,order,setOrder,after,setAfter,setInput1,setInput2} = useContext(VariableContext)

  const {postOrder,response} = usePostOrder();
  const navigate = useNavigate();

  const {user,getAccessTokenSilently} = useAuth0()

  const handleSubmit = async() =>{
    const values = {
      itemname : selected.name,
      status : "Processing",
      userid : user.sub,
      input1,
      input2,
      paymentmode : payment,
      value : selected.discountedprice,
    }
    const token = await getAccessTokenSilently();
    setAfter(selected)
    
   
    await postOrder(values,token);
    setSelected(null);
    setInput1(null);
    setInput2(null);
    setPayment(null);
   
    // setOrder(response)
    navigate("/confirmation")

  }

  

  const handleChange = (e) => {
    setPayment(e.target.value)
    
  }
  return (
    <div className="py-[1.5em] px-[2em]  bg-[#293133] flex flex-col  rounded-[1em] w-full">
      <div className='flex justify-between mb-3'>
        <div className='text-white text-[1.4rem] font-[600]'>Total</div>
        <div className='text-[1.4rem] font-[600] text-[#00BBFF]'>₹{selected ? selected.discountedprice : "0"}</div>
      </div>
      <hr className='w-full'></hr>

      <div className='mt-7 flex flex-col gap-6'>


        <div className='text-white text-[1rem] font-[600] '>Payment Methods</div>


        <div className='flex gap-4 '>
        <ul class="grid w-full md:gap-6 gap-3 md:grid-cols-2">
    <li>
    
        <input type="radio" id="hosting-small" name="hosting" value="upi" class="hidden peer" onChange={handleChange} required />
        <label for="hosting-small" class="inline-flex items-center  w-full p-5 text-gray-500 bg-white border-[3px]  rounded-[1em] cursor-pointer  dark:border-gray-800 dark:peer-checked:text-blue-500 peer-checked:border-[#10779B] peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800  gap-3" >  

        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 65 65" viewBox="0 0 65 65" id="bhim-upi" className='w-8'><polygon fill="#fad1c4" stroke="#e54125" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" points="38.3 5.5 23.1 60.7 51.9 32.4"></polygon><polygon fill="#fff" stroke="#e54125" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" points="28.1 4.1 13.1 60.9 42.2 32.8"></polygon></svg>                         
            <div class="block">
                <div class="w-full text-[1rem] text-white font-semibold">Upi</div>
                <div class="w-full"></div>
            </div>
            
        </label>
    </li>
    <li>
        <input type="radio" id="hosting-big" name="hosting" value="wallet" class="hidden peer" onChange={handleChange}/>
        <label for="hosting-big" class="inline-flex items-center  w-full p-5 gap-3 text-gray-500 bg-white border-[3px]  rounded-[1em] cursor-pointer  dark:border-gray-800 dark:peer-checked:text-blue-500 peer-checked:border-[#10779B] peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 ">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" id="wallet" className='w-8'><path fill="white" d="M14.2142222,-3.90798505e-14 C17.4044444,-3.90798505e-14 20,2.65477957 20,5.91891245 L20,5.91891245 L20,13.0810875 C20,16.3452204 17.4044444,19 14.2142222,19 C13.8462222,19 13.5475556,18.6944139 13.5475556,18.3178881 C13.5475556,17.9413623 13.8462222,17.6357762 14.2142222,17.6357762 C16.6693333,17.6357762 18.6666667,15.5930784 18.6666667,13.0810875 L18.6666667,13.0810875 L18.6666667,7.36498971 L15.3831111,7.36498971 C14.3048889,7.36589919 13.4257778,8.26446795 13.4248889,9.36857977 C13.4257778,10.4726916 14.3048889,11.3712604 15.3831111,11.3721698 L15.3831111,11.3721698 L16.7475556,11.3721698 C17.1155556,11.3721698 17.4142222,11.677756 17.4142222,12.0542817 C17.4142222,12.4308075 17.1155556,12.7363937 16.7475556,12.7363937 L16.7475556,12.7363937 L15.3831111,12.7363937 C13.5688889,12.7354842 12.0924444,11.2248337 12.0915556,9.36857977 C12.0924444,7.51232588 13.5688889,6.00167536 15.3831111,6.00076588 L15.3831111,6.00076588 L18.6666667,6.00076588 L18.6666667,5.91891245 C18.6666667,3.40692164 16.6693333,1.36422383 14.2142222,1.36422383 L14.2142222,1.36422383 L5.78488889,1.36422383 C3.80622222,1.36422383 2.14577778,2.69934422 1.56711111,4.52831363 L1.56711111,4.52831363 L10.3546667,4.52831363 C10.7226667,4.52831363 11.0213333,4.83389977 11.0213333,5.21042554 C11.0213333,5.5878608 10.7226667,5.89253746 10.3546667,5.89253746 L10.3546667,5.89253746 L1.336,5.89253746 L1.336,5.89253746 L1.33333333,5.91891245 L1.33333333,13.0810875 C1.33333333,15.5930784 3.32977778,17.6357762 5.78488889,17.6357762 L5.78488889,17.6357762 L10.0257778,17.6357762 C10.3937778,17.6357762 10.6924444,17.9413623 10.6924444,18.3178881 C10.6924444,18.6944139 10.3937778,19 10.0257778,19 L10.0257778,19 L5.78488889,19 C2.59466667,19 -3.55271368e-15,16.3452204 -3.55271368e-15,13.0810875 L-3.55271368e-15,13.0810875 L-3.55271368e-15,5.91891245 C-3.55271368e-15,2.65477957 2.59466667,-3.90798505e-14 5.78488889,-3.90798505e-14 L5.78488889,-3.90798505e-14 Z M15.8307556,8.62498684 C16.1987556,8.62498684 16.4974222,8.93057297 16.4974222,9.30709875 C16.4974222,9.68362453 16.1987556,9.98921066 15.8307556,9.98921066 L15.8307556,9.98921066 L15.5276444,9.98921066 C15.1596444,9.98921066 14.8609778,9.68362453 14.8609778,9.30709875 C14.8609778,8.93057297 15.1596444,8.62498684 15.5276444,8.62498684 L15.5276444,8.62498684 Z" transform="translate(2 2.5)"></path></svg>
            <div class="block">
              
                <div class="w-full text-[1rem] text-white font-semibold">Wallet</div>
                
            </div>
            
        </label>
    </li>
</ul>
        </div>

        <button className='bg-[#00C5FF] hover:bg-blue-600 rounded-full p-2.5 text-white font-[600] text-[1.1rem] w-full' 
        onClick={(selected !== null && payment !== null && input1 !== null && input2 !== null) ? handleSubmit : null}>BUY NOW</button>
      </div>



      
   </div>
  )
}

export default Payments