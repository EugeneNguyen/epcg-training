import {useQuery} from '@apollo/client';
import {useState} from 'react';
import {Row, Col} from 'reactstrap';
import {useLocation} from 'react-router-dom';
import path from 'path';
import moment from 'moment';
import _ from 'lodash';

import API from '../apis';
import {ButtonLink} from '../../_components/button';
import {Form, Input} from '../../_components/form';

export default function ViewTgUserGeneral({objectId}) {
  const { loading, error, data } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: {id: objectId},
    },
  );
  const location = useLocation();

  if (loading) return "Loading ...";
  if (error) return "Error";
  if (!data) return "No data";

  return (
    <div>
      <div class="bg-white shadow overflow-hidden sm:rounded-lg my-5">
        <div class="px-4 py-3 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            tgUser Information
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div class="border-t border-gray-200">
          <dl className="m-0">

                <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Id
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {_.get(data, 'data.id', 'N/A')}
                  </dd>
                </div>

                <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Username
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {_.get(data, 'data.username', 'N/A')}
                  </dd>
                </div>

                <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Password
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {_.get(data, 'data.password', 'N/A')}
                  </dd>
                </div>

                <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Created At
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {_.get(data, 'data.createdAt', 'N/A')}
                  </dd>
                </div>

                <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Updated At
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {_.get(data, 'data.updatedAt', 'N/A')}
                  </dd>
                </div>
          </dl>
        </div>
      </div>
      <ButtonLink to={path.join(location.pathname, 'edit')} color="primary" size="sm">
      Edit
      </ButtonLink>
    </div>
  );
}
