import {useQuery} from '@apollo/client';
import {useLocation} from 'react-router-dom';
import path from 'path';
import {get} from 'lodash';
import moment from 'moment';

import API from '../apis';
import {ButtonLink} from '../../_components/button';

export default function ViewEtCourseTemplateQuestionMcqGeneral({objectId}) {
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
            etCourseTemplateQuestionMCQ Information
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div class="border-t border-gray-200">
          <dl className="m-0">

                <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Question Code
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {get(data, 'data.questionCode', 'N/A')}
                  </dd>
                </div>

                <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Question
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {get(data, 'data.question', 'N/A')}
                  </dd>
                </div>

                <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Answer A
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {get(data, 'data.answerA', 'N/A')}
                  </dd>
                </div>

                <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Answer B
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {get(data, 'data.answerB', 'N/A')}
                  </dd>
                </div>

                <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Answer C
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {get(data, 'data.answerC', 'N/A')}
                  </dd>
                </div>

                <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Answer D
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {get(data, 'data.answerD', 'N/A')}
                  </dd>
                </div>

                <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Correct Answer
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {get(data, 'data.correctAnswer', 'N/A')}
                  </dd>
                </div>

                <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Explanation
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {get(data, 'data.explanation', 'N/A')}
                  </dd>
                </div>

                <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Question Source
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {get(data, 'data.questionSource.name', 'N/A')}
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
