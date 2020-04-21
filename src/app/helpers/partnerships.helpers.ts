import { PartnerParams } from '../interfaces/partners';
import { PartnershipParams } from '../interfaces/partnership';

const STUDENT_TYPES = [
  'is_sms',
  'is_smp',
  'is_smst'
];

const STAFF_TYPES = [
  'is_sta',
  'is_stt'
];

/**
 * Returns true if partnership is a student type
 *
 * @export
 * @returns boolean
 */
export function isStudent(partnership) {
  return STUDENT_TYPES.filter(type => partnership[type]).length !== 0;
}

/**
 * Returns true if partnership is a staff type
 *
 * @export
 * @returns boolean
 */
export function isStaff(partnership) {
  return STAFF_TYPES.filter(type => partnership[type]).length !== 0;
}

/**
 * Return mobility type for a partnership
 *
 * @export
 * @returns string
 */
export function getMobilityType(partnership) {
  let mobilityType = '';
  const student = isStudent(partnership);
  const staff = isStaff(partnership);
  if (student) {
    const studentTypes = [];

    if (partnership.is_sms) {
      studentTypes.push('studies');
    }
    if (partnership.is_smp) {
      studentTypes.push('training');
    }
    if (partnership.is_smst) {
      studentTypes.push('short term');
    }

    mobilityType = `Student (${studentTypes.join(', ')})`;

    if (staff) {
      mobilityType += ', Staff';
    }
  }


  if (!student && staff) {
    mobilityType = 'Staff';
  }

  return mobilityType;
}

/**
 * Remove empty element from params object
 */
export function getCleanParams(params) {
  const cleanParams = {};
  Object.keys(params).map(key => {
    if (params[key] && params[key].length > 0) {
      cleanParams[key] = params[key];
    }
  });
  return cleanParams;
}


export function getPartnershipParams(query: any): PartnershipParams {
  return getCleanParams({
    campus: query.campus || '',
    city: query.city || '',
    continent: query.continent || '',
    country: query.country || '',
    education_field: query.education_field || '',
    limit: query.limitPartnership || '',
    offset: query.offsetPartnership || '',
    partner: query.partner || '',
    supervisor: query.supervisor || '',
    type: query.type || '',
    ucl_entity: query.ucl_entity || '',
    mobility_type: query.mobility_type || [],
    funding: query.funding || [],
    ordering: 'ucl_entity'
  });
}

export function getPartnerParams(query: any): PartnerParams {
  return getCleanParams({
    campus: query.campus || '',
    city: query.city || '',
    continent: query.continent || '',
    country: query.country || '',
    education_field: query.education_field || '',
    limit: query.limit || '',
    offset: query.offset || '',
    partner: query.partner || '',
    supervisor: query.supervisor || '',
    type: query.type || '',
    ucl_entity: query.ucl_entity || '',
    mobility_type: query.mobility_type || [],
    funding: query.funding || [],
    ordering: query.ordering || ''
  });
}
