import { matchSorter } from 'match-sorter';
import React, { useEffect, useState } from 'react';

import { FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Table, statusFilter } from '../../components/Table/Table';
import { useNavigate } from 'react-router';
import Badge from '../../components/Badge';
import { useSubmitForm } from '../../hooks/useSubmitForm';

const BreedersList = () => {
  const nav = useNavigate();
  const fuzzyTextFilterFn = (rows, id, filterValue) => {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  };
  const { loading, submit } = useSubmitForm();
  fuzzyTextFilterFn.autoRemove = (val) => !val;
  const [breedersData, setBreedersData] = useState([]);

  const filterGreaterThan = (rows, id, filterValue) => {
    return rows.filter((row) => {
      const rowValue = row.values[id];
      return rowValue >= filterValue;
    });
  };

  filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

  const getBreedersList = async () => {
    const response = await submit('GET', 'auth/users?roleId=1', {});
    if (response?.data?.statusCode === 200) {
      setBreedersData(response?.data?.data);
    } else {
      toast.error(response?.data?.message);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      Header: 'Action',
      accessor: 'actions',
      Cell: ({ row }) => {
        return (
          <>
            <div className="flex gap-4 ">
              <span
                onClick={() =>
                  nav(`/admin-layout/breeder-details/${row?.original?.id}`)
                }
                className="cursor-pointer"
              >
                <FaEye />
              </span>
            </div>
          </>
        );
      },
    },
    {
      Header: 'Breeder Name',
      accessor: 'user_name',
      // filter: 'fuzzyText',
    },
    {
      Header: 'Email',
      accessor: 'email',
      filter: 'fuzzyText',
    },
    {
      Header: 'Contact',
      accessor: 'contact_no',
      filter: 'fuzzyText',
    },
    {
      Header: 'Country',
      accessor: 'user_country',
      filter: 'fuzzyText',
    },
    {
      Header: 'Status',
      accessor: 'user_status',
      Cell: ({ row }) => {
        return (
          <Badge
            text={row?.original?.user_status.trim().toLowerCase()}
            isVerified={row?.original?.user_status === 'Verified'}
          />
        );
      },
      Filter: statusFilter,
    },
  ];

  useEffect(() => {
    getBreedersList();
  }, []);

  return (
    <>
      <div className="m-5 ">
        <div className="mt-10 flex ">
          <p className="text-2xl font-semibold ">Breeders List</p>
        </div>
        {breedersData?.length && !loading ? (
          <Table columns={columns} data={breedersData} />
        ) : (
          <>
            {loading ? (
              <span className="loader"></span>
            ) : (
              <h1>No Breeders Found</h1>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default BreedersList;
