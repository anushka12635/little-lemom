import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './ReservationForm.css';
import * as yup from 'yup';

// Schéma de validation avec Yup
const schema = yup.object().shape({
  fullName: yup.string().required('Le nom complet est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  date: yup.date().required('La date est requise').min(new Date(), 'La date ne peut pas être dans le passé'),
  guests: yup.number().required('Le nombre d\'invités est requis').min(1, 'Il doit y avoir au moins 1 invité'),
  specialRequests: yup.string(),
});

const ReservationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Réservation soumise :', data);
    alert('Réservation réussie !');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="reservation-form-title">
      <h1 id="reservation-form-title">Formulaire de Réservation</h1>

      <div>
        <label htmlFor="fullName">Nom Complet :</label>
        <input
          id="fullName"
          type="text"
          {...register('fullName')}
          aria-invalid={errors.fullName ? 'true' : 'false'}
        />
        {errors.fullName && <span role="alert">{errors.fullName.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Email :</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <span role="alert">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="date">Date de Réservation :</label>
        <input
          id="date"
          type="date"
          {...register('date')}
          aria-invalid={errors.date ? 'true' : 'false'}
        />
        {errors.date && <span role="alert">{errors.date.message}</span>}
      </div>

      <div>
        <label htmlFor="guests">Nombre d'Invites :</label>
        <input
          id="guests"
          type="number"
          {...register('guests')}
          aria-invalid={errors.guests ? 'true' : 'false'}
        />
        {errors.guests && <span role="alert">{errors.guests.message}</span>}
      </div>

      <div>
        <label htmlFor="specialRequests">Demandes Spéciales :</label>
        <textarea
          id="specialRequests"
          {...register('specialRequests')}
          aria-invalid={errors.specialRequests ? 'true' : 'false'}
        />
      </div>

      <button type="submit">Réserver</button>
    </form>
  );
};

export default ReservationForm;