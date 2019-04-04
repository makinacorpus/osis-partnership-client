import Partner from "./partners";
import Contact from "./contact";
import Funding from "./funding";

export default interface Partnership {
  partner: Partner
  education_field:	string
  ucl_university: string
  ucl_university_labo: string
  supervisor: string
  mobility_type: 'student' | 'studies' | 'short_term' | 'training'
  status: {
    valid: boolean
    last_valid: boolean
  }
  out_education_level: string
  out_entity: string
  out_university_offer: string
  out_contact: Contact
  out_portal: string
  out_funding: Funding
  out_partner_contact: Contact
  in_contact: Contact
  in_portal: string
  staff_contact_name: string
  UCL: Contact
  staff_partner_contact: Contact
  staff_funding: Funding
}