module.exports = {
    async shareOptions(cust_name,cust_credit){
        let shareObject =[  { label:"Call", type:"call", url: "" },
                            { label:"SMS", type:"sms", url: "" },
                            { label:"WhatsApp", type:"whatsapp", url: "" }
                        ];

        if(cust_credit)
        {
            //---------------for SMS--------------------//
            shareObject[1].url = "sms:;?&body=Dear%20"+ cust_name +"%2C%20you%20have%20an%20overdue%20amount%20of%20"+ cust_credit +"%20to%20be%20paid%20to%20us.%20Request%20you%20to%20pay%20this%20amount%20at%20the%20earliest.";
            //---------------for Whatsapp--------------//
            shareObject[2].url = "https://api.whatsapp.com/send?text=Dear%20"+ cust_name + "%2C%20you%20have%20an%20overdue%20amount%20of%20"+ + cust_credit + +"%20to%20be%20paid%20to%20us.%20Request%20you%20to%20pay%20this%20amount%20at%20the%20earliest.";        
        }
        else
        {
            shareObject[1].url = "sms:;?&body=Dear%20"+ cust_name + "%2C%20you%20have%20an%20overdue%20amount%20of%20%E2%82%B90.00%20to%20be%20paid%20to%20us.%20Request%20you%20to%20pay%20this%20amount%20at%20the%20earliest."
            shareObject[2].url = "https://api.whatsapp.com/send?text=Dear%20"+ cust_name + "%2C%20you%20have%20an%20overdue%20amount%20of%20%E2%82%B90.00%20to%20be%20paid%20to%20us.%20Request%20you%20to%20pay%20this%20amount%20at%20the%20earliest.";        
        }            

        
        return shareObject;
    }
}