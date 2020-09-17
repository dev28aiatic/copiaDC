Interface de municipio
======================

En esta módulo se crea la interface de Municipios que tendrá los atributos para poder mostrar los municipio y departamento de Colombia desde la API y poder ser guardados y usados.


.. code-block::

   export interface Municipio {
        region: string,
        c_digo_dane_del_departamento: number,
        departamento: string,
        c_digo_dane_del_municipio: number,
        municipio: string,
    }


Como se puede observar, se crea cada uno de los atributos necesarios para poder trabajar con la Api que trabajará con los municipios y departamentos.
